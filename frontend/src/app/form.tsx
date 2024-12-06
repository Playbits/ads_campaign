"use client";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/helper";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Define a schema for individual files
const fileSchema = z
  .instanceof(File, {
    message: "Please select an image file.",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Please upload a valid image file (JPEG, PNG, or WebP).",
  });

// Zod Schema for Multiple Images
const imagesSchema = z
  .array(fileSchema)
  .min(1, "Please upload at least one image.");

// Define a Zod schema for validating the date range
const dateRangeSchema = z
  .object({
    from: z.date({
      required_error: "Start date is required.",
      invalid_type_error: "Start date must be a valid date.",
    }),
    to: z.date({
      required_error: "End date is required.",
      invalid_type_error: "End date must be a valid date.",
    }),
  })
  .refine((data) => data.from <= data.to, {
    message: "Start date must be before or equal to the end date.",
    path: ["end"], // Point the error to the `end` field
  });

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ads campaign Name must be at least 2 characters.",
  }),
  dates: dateRangeSchema,
  totalBudget: z
    .string()
    .min(1, "Total budget is required")
    .trim()
    .regex(/^[0-9]*$/, "Enter only  Number "),
  dailyBudget: z
    .string()
    .min(1, "Daily budget is required")
    .trim()
    .regex(/^[0-9]*$/, "Enter only  Number "),
  images: imagesSchema,
});

const ShowImages = ({
  uploadedFiles,
  setUploadedFiles,
}: {
  uploadedFiles: File[] | undefined;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[] | undefined>>;
}) => {
  const output: React.JSX.Element[] = [];
  const [files, setFiles] = React.useState(uploadedFiles);

  React.useEffect(() => {
    setFiles(uploadedFiles);
  }, [uploadedFiles]);

  React.useEffect(() => {
    setUploadedFiles(files);
  }, [files, setUploadedFiles]);

  const memorizedFiles = React.useMemo(() => files, [files]);

  const removeFile = (index: number) => {
    setFiles((f) => {
      if (f) {
        return f.filter((_, i) => i != index);
      }
    });
  };

  if (memorizedFiles) {
    for (const i in memorizedFiles) {
      const file = memorizedFiles[i];
      const image = URL.createObjectURL(file);
      output.push(
        <div
          key={file.lastModified}
          className="border border-gray-500 p-5 gap-5 relative"
        >
          <div className="absolute left-0 text-red-500">
            <a
              onClick={() => removeFile(parseInt(i))}
              className="cursor-pointer"
            >
              Delete Image
            </a>
          </div>
          <img src={image} alt={file.name} />
          <p>{file.name}</p>
        </div>
      );
    }
    return <div className="flex flex-col gap-5">{output}</div>;
  }
  return <div className="flex gap-5">{output}</div>;
};

export function CampaignFrom() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dates: date,
      images: uploadedFiles,
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const { setValue } = form;
  React.useEffect(() => {
    if (uploadedFiles) {
      setValue("images", uploadedFiles, { shouldValidate: true });
    }
  }, [uploadedFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const FileList = e.target.files;
    const files: File[] = [];
    if (FileList) {
      for (const file of FileList) {
        files.push(file);
      }
      setUploadedFiles((f) => {
        if (f) {
          return [...files, ...f];
        }
        return files;
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="absolute top-0 right-0 m-5">
          <Button type="submit">Submit</Button>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ads Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Ads campaign name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dailyBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Daily Budget</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Ads campaign Daily Budget"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormDescription>
                {formatCurrency(Number(form.getValues("dailyBudget")))}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalBudget"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Total Budget</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Ads campaign Total Budget"
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormDescription>
                {formatCurrency(Number(form.getValues("totalBudget")))}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ads Start - End dates</FormLabel>

              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={(e) => (field.onChange(e), setDate(e))}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Campaign images</FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Upload an image"
                    onChange={handleChange}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                  />
                  <ShowImages {...{ uploadedFiles, setUploadedFiles }} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
