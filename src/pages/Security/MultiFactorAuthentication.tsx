import { PageLayout } from "@/components/layouts/PageLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ConfirmMfaDialog } from "@/components/Security/ConfirmMfaDialog";
import { Button } from "@/components/ui/button";

type MFAForm = {
  enabled: boolean;
  method: "email" | "authenticator";
};

export default function MultiFactorAuthenticationPage() {
  const form = useForm<MFAForm>({
    defaultValues: { enabled: true, method: "authenticator" },
  });

  const onSave = (data: MFAForm) => {
    console.log("Save MFA settings:", data);
    alert("Saved (stub)");
  };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const onOpenConfirm = () => setConfirmOpen(true);
  const onConfirm = (password: string) => {
    // In a real app, verify password before saving.
    console.log("Confirm password provided:", password);
    setConfirmOpen(false);
    onSave(form.getValues());
  };

  return (
    <PageLayout title="Multi-Factor Authentication">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="mt-4 space-y-6">
          <div className="border rounded-md bg-white p-4">
            <h3 className="font-medium mb-2">Global MFA Status</h3>
            <p className="text-sm text-slate-600 mb-4">
              Enable or disable Multi-Factor Authentication for all users in
              your organization.
            </p>

            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem className="p-4 border rounded-lg flex justify-between items-center">
                  <FormLabel>MFA Enabled</FormLabel>
                  <FormControl>
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={(v) => field.onChange(!!v)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border rounded-md bg-white p-4">
            <h3 className="font-medium mb-2">MFA Method Selection</h3>
            <p className="text-sm text-slate-600 mb-4">
              Choose the primary method users will use for Multi-Factor
              Authentication.
            </p>

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="my-8">
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-2"
                    >
                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="email" />
                        <span className="ml-2">
                          Email OTP (One-Time Password)
                        </span>
                      </label>

                      <label className="inline-flex items-center gap-2">
                        <RadioGroupItem value="authenticator" />
                        <span className="ml-2">
                          Authenticator App (e.g., Google Authenticator, Authy)
                        </span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-4 border rounded-md p-6 ">
              <p className="text-center text-sm text-slate-500 mb-4">
                To set up your authenticator app, scan the QR code below or
                manually enter the key into your app.
              </p>
              <div className="max-w-52 mx-auto">
                <img src="/src/assets/images/mobile-qr.png" alt="QR code" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="outline"
              className="w-32"
              onClick={onOpenConfirm}
            >
              Save
            </Button>
          </div>
        </form>

        <ConfirmMfaDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirm={onConfirm}
        />
      </Form>
    </PageLayout>
  );
}
