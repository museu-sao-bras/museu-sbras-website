import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, Euro, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Donate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [donationType, setDonationType] = useState<'money' | 'item'>('money');
  const [formData, setFormData] = useState({
    amount: '',
    itemDescription: '',
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Success!",
      description: t('donate.form.success')
    });

    setFormData({
      amount: '',
      itemDescription: '',
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="h-16 w-16 text-secondary mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-foreground mb-4">
              {t('donate.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('donate.subtitle')}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Make a Donation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-base mb-4 block">{t('donate.form.type')}</Label>
                  <RadioGroup
                    value={donationType}
                    onValueChange={(value) => setDonationType(value as 'money' | 'item')}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="money"
                      className={`flex items-center gap-3 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                        donationType === 'money' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <RadioGroupItem value="money" id="money" />
                      <div className="flex items-center gap-3">
                        <Euro className="h-8 w-8 text-primary" />
                        <div>
                          <div className="font-bold">{t('donate.monetary')}</div>
                          <div className="text-sm text-muted-foreground">Financial contribution</div>
                        </div>
                      </div>
                    </Label>

                    <Label
                      htmlFor="item"
                      className={`flex items-center gap-3 p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                        donationType === 'item' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <RadioGroupItem value="item" id="item" />
                      <div className="flex items-center gap-3">
                        <Package className="h-8 w-8 text-secondary" />
                        <div>
                          <div className="font-bold">{t('donate.item')}</div>
                          <div className="text-sm text-muted-foreground">Costume or artifact</div>
                        </div>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                {donationType === 'money' ? (
                  <div>
                    <Label htmlFor="amount">{t('donate.form.amount')}</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="50.00"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="itemDescription">{t('donate.form.itemDesc')}</Label>
                      <Textarea
                        id="itemDescription"
                        value={formData.itemDescription}
                        onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                        rows={4}
                        placeholder="Please describe the item(s) you wish to donate..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="images">{t('donate.form.images')}</Label>
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Please upload images of the item(s) for our assessment
                      </p>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                  {t('donate.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Donate?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">€</div>
                <h4 className="font-bold mb-2">Preservation</h4>
                <p className="text-sm text-muted-foreground">
                  Fund conservation and restoration of historical textiles
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">📚</div>
                <h4 className="font-bold mb-2">Education</h4>
                <p className="text-sm text-muted-foreground">
                  Support educational programs and workshops
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">🎨</div>
                <h4 className="font-bold mb-2">Exhibitions</h4>
                <p className="text-sm text-muted-foreground">
                  Help create engaging exhibitions for visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
