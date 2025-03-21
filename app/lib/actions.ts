"use server";
import { z } from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, {
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: false, // 원격 DB는 true
});

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  data: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, data: true });
const UpdateInvoice = FormSchema.omit({ id: true, data: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/ui/dashboard/invoices");
  redirect("/ui/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (err) {
    console.error(err);
  }

  revalidatePath("/ui/dashboard/invoices");
  redirect("/ui/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error("Faild to Delete Invoice");
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/ui/dashboard/invoices");
  redirect("/ui/dashboard/invoices");
}
