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
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ads campaign Name must be at least 2 characters.",
  }),
  dates: z.string().min(2, {
    message: "Ads campaign Name must be at least 2 characters.",
  }),
  totalBudget: z.number().min(2, {
    message: "Ads campaign Name must be at least 2 characters.",
  }),
  dailyBudget: z.string().min(2, {
    message: "Ads campaign Name must be at least 2 characters.",
  }),
  images: z
    .instanceof(File, {
      message: "Please select an image file.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    }),
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>();

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
          name="name"
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
                      onSelect={setDate}
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
          render={({}) => (
            <FormItem>
              <FormLabel>Select Campaign images</FormLabel>
              <FormControl>
                <>
                  <input
                    placeholder="Upload an image"
                    onChange={handleChange}
                    type="file"
                    accept=".jpeg,.jpg,.png,.webp"
                    multiple
                  />
                  {uploadedFiles && JSON.stringify(uploadedFiles)}
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
