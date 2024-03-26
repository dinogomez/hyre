"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
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

import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Barangay, City, Province, Region } from "@/lib/types";
import { eq } from "drizzle-orm";
import { numberOfEmployee } from "@/lib/data/data.number-employees";
import { Tag, TagInput } from "@/components/ui/tag/tag-input";
import { Markets } from "@/lib/data/data.markets";

const FormDataSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    companyDesc: z.string().min(1, "Company description is required"),
    companyEmail: z
        .string()
        .min(1, "Company Email is required")
        .email("Invalid email address"),
    website: z.string(),
    region: z.string().min(1, "Address is required."),
    province: z.string().min(1, "Select a region first."),
    city: z.string().min(1, "Select a province first."),
    barangay: z.string(),
    industry: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
            message: "You have to select at least one industry.",
        }),
    logo: z.string().min(1, "Logo is required"),
    numEmployee: z.string().min(1, "Number of employees is required"),
});
type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
    {
        id: "Step 1",
        name: "Company Information",
        fields: [
            "companyName",
            "companyDesc",
            "industry",
            "companyEmail",
            "website",
            "region",
            "province",
            "city",
            "barangay",
            "logo",
            "numEmployee",
        ],
    },
    {
        id: "Step 2",
        name: "Jobs",
        fields: ["country", "state", "city", "street", "zip"],
    },
    { id: "Step 3", name: "Complete" },
];

export default function RecruitForm() {
    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");

    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>();
    const [imageBase64, setImageBase64] = useState<string>("");
    const [autocompleteTags, setAutocompleteTags] = useState<Tag[]>([]);

    const delta = currentStep - previousStep;

    const region = () => {
        regions().then((response) => {
            setRegion(response);
        });
    };

    const province = (e: string) => {
        setRegionAddr(e);
        provinces(e).then((response) => {
            setProvince(response);
            setProvinceAddr("");
            setCityAddr("");
            setBarangayAddr("");
            setCity([]);
            setBarangay([]);
        });
    };

    const city = (e: string) => {
        setProvinceAddr(e);
        cities(e).then((response) => {
            setCity(response);
        });
    };

    const barangay = (e: string) => {
        setCityAddr(e);
        barangays(e).then((response) => {
            setBarangay(response);
        });
    };

    const brgy = (e: string) => {
        setBarangayAddr(e);
    };

    useEffect(() => {
        region();
    }, []);

    const form = useForm<z.infer<typeof FormDataSchema>>({
        resolver: zodResolver(FormDataSchema),
        mode: "onChange",
        defaultValues: {
            companyName: "",
            companyDesc: "",
            companyEmail: "",
            website: "",
            region: "",
            province: "",
            city: "",
            barangay: "",
            industry: [],
            logo: "",
            numEmployee: "",
        },
    });

    form.register("industry", {
        value: autocompleteTags.map((tag) => tag.text),
    });
    useEffect(() => {
        const industryValues = autocompleteTags.map((tag) => tag.text);
        form.setValue("industry", industryValues);
        form.trigger("industry");
    }, [autocompleteTags, form]);

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        form.reset();
    };

    type FieldName = keyof Inputs;

    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true,
        });

        console.log(form.getValues());

        if (!output) return;

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await form.handleSubmit(processForm)();
            }
            setPreviousStep(currentStep);
            setCurrentStep((step) => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep((step) => step - 1);
        }
    };

    form.register("logo", {
        validate: (value: any) => {
            if (!value) {
                return "Please upload a company logo.";
            }
            const isValidImage =
                value instanceof File && /\.(png|jpg|jpeg)$/i.test(value.name);
            if (!isValidImage) {
                return "Please upload a valid image file (PNG, JPG, JPEG).";
            }
            return true;
        },
    });

    const handleImageChange = (file: FileList | null) => {
        if (file?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImageBase64(base64String);
                setImagePreviewUrl(reader.result as string);
            };
            form.setValue("logo", imageBase64);
            reader.readAsDataURL(file[0]);
        }
    };

    return (
        <section className="flex flex-col justify-between p-24">
            {/* steps */}
            <nav aria-label="Progress">
                <ol
                    role="list"
                    className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                    {steps.map((step, index) => (
                        <li key={step.name} className="md:flex-1">
                            {currentStep > index ? (
                                <div className="group flex w-full flex-col border-l-4 border-highlight py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className="text-sm font-medium text-highlight transition-colors ">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className="flex w-full flex-col border-l-4 border-highlight py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                                    aria-current="step"
                                >
                                    <span className="text-sm font-medium text-highlight">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            ) : (
                                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                    <span className="text-sm font-medium text-muted-foreground transition-colors">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            {/* Form */}
            <Form {...form}>
                <form
                    className="mt-5 py-12"
                    onSubmit={form.handleSubmit(processForm)}
                >
                    {currentStep === 0 && (
                        <motion.div
                            initial={{
                                x: delta >= 0 ? "50%" : "-50%",
                                opacity: 0,
                            }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mx-auto w-8/12"
                        >
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        About your company
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Provide your company details.
                                    </p>
                                </div>
                                <Image
                                    src={imagePreviewUrl ?? "/200x200.svg"}
                                    className="h-32 w-32 rounded-md border border-input bg-background p-1"
                                    width={128}
                                    height={128}
                                    alt="Logo"
                                />
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Company Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Company Name"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is your public company
                                                    name.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <Controller
                                        control={form.control}
                                        name="logo"
                                        render={({
                                            field: { onChange, ...field },
                                        }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Company Logo
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        accept=".png,.jpg,.jpeg"
                                                        {...field}
                                                        className="w-full rounded-md border p-2"
                                                        onChange={(e) => {
                                                            handleImageChange(
                                                                e.target.files
                                                            );
                                                            onChange(e);
                                                        }}
                                                        value={undefined}
                                                    />
                                                </FormControl>

                                                <FormDescription className="">
                                                    Images up to 2MB{" "}
                                                    {"(PNG, JPG, JPEG)"}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="companyDesc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Company Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Describe your company"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    What is your company about?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="industry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Industry</FormLabel>
                                                <FormControl>
                                                    <div className="w-full">
                                                        <TagInput
                                                            {...field}
                                                            placeholder="Search for industries."
                                                            tags={
                                                                autocompleteTags
                                                            }
                                                            enableAutocomplete
                                                            maxTags={3}
                                                            restrictTagsToAutocompleteOptions
                                                            autocompleteOptions={
                                                                Markets
                                                            }
                                                            className="sm:min-w-[450px]"
                                                            setTags={(
                                                                newTags
                                                            ) => {
                                                                setAutocompleteTags(
                                                                    newTags
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    What is Industries is the
                                                    company in?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="companyEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Company Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Company@email.com"
                                                        {...field}
                                                    />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Company.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="region"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Region
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        region();
                                                        province(value);
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Region" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {regionData &&
                                                            regionData.length >
                                                                0 &&
                                                            regionData.map(
                                                                (
                                                                    item: Region
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.region_code
                                                                        }
                                                                        value={
                                                                            item.region_code
                                                                        }
                                                                    >
                                                                        {
                                                                            item.region_name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select your region.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="province"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Province
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        city(value);
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={!regionAddr}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Province" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {provinceData &&
                                                            provinceData.length >
                                                                0 &&
                                                            provinceData.map(
                                                                (
                                                                    item: Province
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.province_code
                                                                        }
                                                                        value={
                                                                            item.province_code
                                                                        }
                                                                    >
                                                                        {
                                                                            item.province_name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select your province.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    City
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        barangay(value);
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={!provinceAddr}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a city" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {cityData &&
                                                            cityData.length >
                                                                0 &&
                                                            cityData.map(
                                                                (
                                                                    item: City
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.city_code
                                                                        }
                                                                        value={
                                                                            item.city_code
                                                                        }
                                                                    >
                                                                        {
                                                                            item.city_name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select your city.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <FormField
                                        control={form.control}
                                        name="barangay"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel optional={true}>
                                                    Barangay
                                                </FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        brgy(value);
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={!cityAddr}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Barangay" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {barangayData &&
                                                            barangayData.length >
                                                                0 &&
                                                            barangayData.map(
                                                                (
                                                                    item: Barangay
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.brgy_code
                                                                        }
                                                                        value={
                                                                            item.brgy_code
                                                                        }
                                                                    >
                                                                        {
                                                                            item.brgy_name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Select your barangay.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="numEmployee"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Number of Employees
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select the number of employees" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {numberOfEmployee &&
                                                            numberOfEmployee.length >
                                                                0 &&
                                                            numberOfEmployee.map(
                                                                (item) => (
                                                                    <SelectItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={
                                                                            item.id
                                                                        }
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    How big is the company?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            initial={{
                                x: delta >= 0 ? "50%" : "-50%",
                                opacity: 0,
                            }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Address
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Address where you can receive mail.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3"></div>

                                <div className="col-span-full"></div>

                                <div className="sm:col-span-2 sm:col-start-1"></div>

                                <div className="sm:col-span-2"></div>

                                <div className="sm:col-span-2"></div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Complete
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Thank you for your submission.
                            </p>
                        </>
                    )}
                </form>
            </Form>
            {/* Navigation */}
            <div className="mt-8 pt-5">
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={prev}
                        disabled={currentStep === 0}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
