"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { isValidLegalEntityNif } from "../helpers/nif";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  nif: z
    .string()
    .trim()
    .min(1)
    .refine((value) => isValidLegalEntityNif(value), {
      message: "NIF inválido.",
    }),
  email: z.string().trim().toLowerCase().email({
    message: "E-mail obrigatório",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const FinishOrderButton = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nif: "",
      email: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: FormSchema) => {
    console.log({ data });
  };

  return (
    /* BOTÃO DE FINALIZAR PEDIDO */
    <Drawer>
      {/* asChild é bom aplicar pela "clean cod" para nao ficar botao dentro de botao, e somente aplicar a funcao e propriedades do de cima para o debaixo */}
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">Finalizar Pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pegou tudo que queria?</DrawerTitle>
          <DrawerDescription>
            Então bora saborear essas delicias.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome e Apelido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome e apelido..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nif"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº Contribuinte</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu contribuinte..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter>
                <Button
                  variant="destructive"
                  type="submit"
                  className="rounded-full"
                >
                  Enviar
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="outline">
                    Cancelar 😢
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
