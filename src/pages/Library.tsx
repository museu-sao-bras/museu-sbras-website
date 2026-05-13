import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { logEvent } from '@/lib/api';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import i18n from '@/i18n/config';

type RawBook = Record<string, string>;

type Book = {
    nr: string;
    title: string;
    vol: string;
    author: string;
    publisher: string;
    place: string;
    year: string;
    est: string;
    pra: string;
    index: string;
    link: string;
};

const endpoint = 'https://www.museu-sbras.com/biblioteca/get-livros.php';

const normalize = (r: RawBook): Book => {
    const get = (k: string) => (r[k] ?? '').toString().trim();
    const authorName = [get('AutorNome'), get('AutorApelido')].map(s => s.trim()).filter(Boolean).join(' ').trim();

    return {
        nr: get('Nr'),
        title: get('Titulo'),
        vol: get('NumVol'),
        author: authorName || get('AutorNome') || get('AutorApelido'),
        publisher: get('Editora'),
        place: get('LugPublic'),
        year: get('DataPublic'),
        est: get('Est'),
        pra: get('Pra'),
        index: get('Indice'),
        link: get('link digital') || get('link') || '',
    };
};

const Library = () => {
    const { t } = useTranslation();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<'title' | 'year' | 'author'>('title');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(endpoint);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (!Array.isArray(data)) throw new Error('Unexpected response format');

                const normalized = data.map((r: RawBook) => normalize(r));
                if (mounted) setBooks(normalized);
            } catch (err: any) {
                if (mounted) setError(err?.message ?? 'Failed to load');
            } finally {
                if (mounted) setLoading(false);
            }
        };
        load();
        // fire page view tracking (non-blocking)
        void logEvent({ event_type: 'page_view', path: "/library", properties: { page: 'library', currentLanguage: i18n.language } });
        return () => { mounted = false; };
    }, []);

    return (
        <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-8xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('nav.library', 'Library')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading && <div className="py-8 text-center">{t('library.loading', 'Loading…')}</div>}
                            {error && <div className="py-8 text-center text-destructive">{t('library.error', { error })}</div>}

                            {!loading && !error && (
                                <>
                                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <Input
                                                placeholder={t('library.controls.searchPlaceholder', 'Search title, author, publisher')}
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm text-muted-foreground mr-2">{t('library.controls.sortBy', 'Sort by')}</label>
                                            <select
                                                className="border rounded p-2 bg-background"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value as any)}
                                            >
                                                <option value="title">{t('library.table.title')}</option>
                                                <option value="year">{t('library.table.year')}</option>
                                                <option value="author">{t('library.table.author')}</option>
                                            </select>
                                            <Button variant="ghost" onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}>
                                                {sortDir === 'asc' ? '↑' : '↓'}
                                            </Button>
                                        </div>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {/* <TableHead>{t('library.table.nr')}</TableHead> */}
                                                <TableHead>{t('library.table.link')}</TableHead>
                                                <TableHead>{t('library.table.title')}</TableHead>
                                                <TableHead>{t('library.table.description')}</TableHead>
                                                <TableHead>{t('library.table.vol')}</TableHead>
                                                <TableHead>{t('library.table.author')}</TableHead>
                                                <TableHead>{t('library.table.publisher')}</TableHead>
                                                <TableHead>{t('library.table.place')}</TableHead>
                                                <TableHead>{t('library.table.year')}</TableHead>
                                                <TableHead>{t('library.table.est')}</TableHead>
                                                <TableHead>{t('library.table.pra')}</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {books
                                                .filter((b) => {
                                                    // Exclude entries without an author
                                                    if (!b.author) return false;
                                                    if (!query) return true;
                                                    const q = query.toLowerCase();
                                                    return (
                                                        b.title.toLowerCase().includes(q) ||
                                                        b.author.toLowerCase().includes(q) ||
                                                        b.publisher.toLowerCase().includes(q)
                                                    );
                                                })
                                                .sort((a, b) => {
                                                    let res = 0;
                                                    if (sortBy === 'title') res = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
                                                    if (sortBy === 'author') res = a.author.localeCompare(b.author, undefined, { sensitivity: 'base' });
                                                    if (sortBy === 'year') {
                                                        const ay = parseInt(a.year) || 0;
                                                        const by = parseInt(b.year) || 0;
                                                        res = ay - by;
                                                    }
                                                    return sortDir === 'asc' ? res : -res;
                                                })
                                                .map((b) => (
                                                    <TableRow key={`${b.nr}-${b.title}`}>
                                                        {/* <TableCell className="w-[48px] font-mono">{b.nr}</TableCell> */}
                                                        <TableCell className="w-[120px]">
                                                            {b.link ? (
                                                                <a
                                                                    href={b.link}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-primary underline"
                                                                    onClick={() => { void logEvent({ event_type: 'book_link_click', properties: { title: b.title, url: b.link, currentLanguage: i18n.language } }); }}
                                                                >{t('library.view')}</a>
                                                            ) : '—'}
                                                        </TableCell>
                                                        <TableCell>{b.title}</TableCell>
                                                        <TableCell className="max-w-[240px] break-words">
                                                            {b.index ? (
                                                                b.index.length > 20 ? (
                                                                    <button
                                                                        className="text-primary underline"
                                                                        onClick={() => {
                                                                            void logEvent({ event_type: 'book_description_click', properties: { title: b.title, currentLanguage: i18n.language } });
                                                                            setSelectedIndex(b.index);
                                                                            setDialogOpen(true);
                                                                        }}
                                                                    >
                                                                        {b.index.slice(0, 20)}…
                                                                    </button>
                                                                ) : (
                                                                    b.index
                                                                )
                                                            ) : (
                                                                '—'
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="w-[80px]">{b.vol}</TableCell>
                                                        <TableCell className="w-[220px]">{b.author}</TableCell>
                                                        <TableCell className="w-[180px]">{b.publisher}</TableCell>
                                                        <TableCell className="w-[140px]">{b.place}</TableCell>
                                                        <TableCell className="w-[100px]">{b.year}</TableCell>
                                                        <TableCell className="w-[80px]">{b.est}</TableCell>
                                                        <TableCell className="w-[80px]">{b.pra}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </>
                            )}

                            <Dialog open={dialogOpen} onOpenChange={(v) => { setDialogOpen(v); if (!v) setSelectedIndex(null); }}>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{t('library.descriptionTitle', 'Description')}</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription>
                                        <div className="whitespace-pre-wrap max-h-[60vh] overflow-auto">{selectedIndex}</div>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default Library;
