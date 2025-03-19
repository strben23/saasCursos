"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../products.api";
import { useParams, useRouter } from "next/navigation";

export function ProductForm({product}: any) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: product?.name,
      description: product?.description,
      price: product?.price,
      image: product?.image,
    }
  });
  const router = useRouter();
  const params = useParams<{id: string}>();
  console.log(params)

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      const res = await updateProduct(params.id, {
        ...data,
        price: parseFloat(data.price),
      })
      console.log(res)
    } else {
    await createProduct({
      ...data,
      price: parseFloat(data.price),
    });
    }

    router.push("/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Nombre del Curso</Label>
      <Input {...register("name")} />

      <Label>Descripción</Label>
      <Input {...register("description")} />

      <Label>Duración</Label>
      <Input {...register("price")} />

      <Label>Imágen</Label>
      <Input {...register("image")} />

      <Button>
        {
          params.id ? 'Actualizar Curso' : 'Crear Curso'
        }
      </Button>
    </form>
  );
}
