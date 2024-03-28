"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { numberOfEmployee } from "@/lib/data/data.number-employees";
import { Tag, TagInput } from "@/components/ui/tag/tag-input";
import { Markets } from "@/lib/data/data.markets";
import { CompanySchema } from "@/lib/schema/zod/company.schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { JobSchema } from "@/lib/schema/zod/job.schema";
import Tiptap from "@/components/tiptap/tiptap";
import { jobTypeEnum, workArrangementEnum } from "@/lib/data/data.enum";
import { Skills } from "@/lib/data/data.skills";

const MergeSchema = CompanySchema.merge(JobSchema);
type Inputs = z.infer<typeof MergeSchema>;

const steps = [
    {
        id: "Step 1",
        name: "Company Information",
        fields: [
            "companyName",
            "companyLogo",
            "companyDesc",
            "industry",
            "companyEmail",
            "website",
            "region",
            "province",
            "city",
            "barangay",
            "numEmployee",
        ],
    },
    {
        id: "Step 2",
        name: "Create a Job",
        fields: [
            "jobTitle",
            "jobDesc",
            "jobType",
            "workArrangement",
            "yearsExp",
            "skills",
        ],
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
    const [industryTags, setIndustryTags] = useState<Tag[]>([]);
    const [skillTags, setSkillTags] = useState<Tag[]>([]);

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

    const form = useForm<z.infer<typeof MergeSchema>>({
        resolver: zodResolver(MergeSchema),
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
            numEmployee: "",
            jobTitle: "",
            jobDesc: "",
            skills: [],
        },
    });

    form.register("industry", {
        value: industryTags.map((tag) => tag.text),
    });

    form.register("skills", {
        value: skillTags.map((tag) => tag.text),
    });

    useEffect(() => {
        const industryValues = industryTags.map((tag) => tag.text);
        form.setValue("industry", industryValues);
        if (industryTags.length > 0) {
            form.trigger("industry");
        }
    }, [industryTags, form]);

    useEffect(() => {
        const skillsValues = skillTags.map((tag) => tag.text);
        form.setValue("skills", skillsValues);
        if (skillTags.length > 0) {
            form.trigger("skills");
        }
    }, [skillTags, form]);

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        form.reset();
    };

    type FieldName = keyof Inputs;

    const next = async () => {
        const fields = steps[currentStep].fields;
        // const output = await form.trigger(fields as FieldName[], {
        //     shouldFocus: true,
        // });

        // console.log(form.getValues());

        // if (!output) return;

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

    const handleImageChange = (file: FileList | null) => {
        if (file?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImageBase64(base64String);
                setImagePreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file[0]);
        }
    };

    return (
        <section className="flex flex-col justify-between p-24 pt-10">
            {/* steps */}
            <nav aria-label="Progress">
                <ol
                    role="list"
                    className="space-y-4 md:flex md:space-x-8 md:space-y-0"
                >
                    {steps.map((step, index) => (
                        <li key={step.name} className="md:flex-1">
                            {currentStep > index ? (
                                <div className="group flex w-full flex-col border-l-4 border-highlight py-2 pl-4 transition-colors md:border-l-0 md:border-t-8 md:pb-0 md:pl-0 md:pt-4">
                                    <span className="text-sm font-medium text-highlight transition-colors ">
                                        {step.id}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {step.name}
                                    </span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className="flex w-full flex-col border-l-4 border-highlight py-2 pl-4 md:border-l-0 md:border-t-8 md:pb-0 md:pl-0 md:pt-4"
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
                                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-8 md:pb-0 md:pl-0 md:pt-4">
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
                                    priority
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
                                    <FormField
                                        control={form.control}
                                        name="companyLogo"
                                        render={({
                                            field: {
                                                value,
                                                onChange,
                                                ...fieldProps
                                            },
                                        }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Company Logo
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...fieldProps}
                                                        placeholder="logo"
                                                        type="file"
                                                        accept="image/jpeg, image/jpg,image/png,"
                                                        onChange={(event) => {
                                                            handleImageChange(
                                                                event.target
                                                                    .files
                                                            );
                                                            onChange(
                                                                event.target
                                                                    .files &&
                                                                    event.target
                                                                        .files[0]
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormDescription className="">
                                                    Images up to 5MB{" "}
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
                                                <FormLabel required={true}>
                                                    Company Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
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
                                                <FormLabel required={true}>
                                                    Industry
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="w-full">
                                                        <TagInput
                                                            {...field}
                                                            placeholder="Search for industries."
                                                            tags={industryTags}
                                                            enableAutocomplete
                                                            maxTags={5}
                                                            autocompleteOptions={
                                                                Markets
                                                            }
                                                            className="sm:min-w-[450px]"
                                                            setTags={(
                                                                newTags
                                                            ) => {
                                                                setIndustryTags(
                                                                    newTags
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    What industries is the
                                                    company in? Maximum of 5.
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
                                                        placeholder="company@email.com"
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
                                                        placeholder="https://www.company.com/"
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
                            className="mx-auto w-8/12"
                        >
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Job Details
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        What is the job about?
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="jobTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Job Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Job Title"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    What is the position called?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="jobDesc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Job Description
                                                </FormLabel>
                                                <FormControl className="">
                                                    <Tiptap
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    What are the job
                                                    responsibilities?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Skills
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="w-full">
                                                        <TagInput
                                                            {...field}
                                                            placeholder="Search for industries."
                                                            tags={skillTags}
                                                            restrictTagsToAutocompleteOptions
                                                            enableAutocomplete
                                                            maxTags={5}
                                                            autocompleteOptions={
                                                                Skills
                                                            }
                                                            className="sm:min-w-[450px]"
                                                            setTags={(
                                                                newTags
                                                            ) => {
                                                                setSkillTags(
                                                                    newTags
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    What industries is the
                                                    company in? Maximum of 5.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="jobType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Job Type
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your job type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {jobTypeEnum.map(
                                                            (
                                                                jobtype,
                                                                index
                                                            ) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={
                                                                        jobtype
                                                                    }
                                                                >
                                                                    {jobtype}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    What type of Job is it?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="sm:col-span-6">
                                    <FormField
                                        control={form.control}
                                        name="workArrangement"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required={true}>
                                                    Work Arrangement
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your work arrangement" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {workArrangementEnum.map(
                                                            (
                                                                arrangement,
                                                                index
                                                            ) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={
                                                                        arrangement
                                                                    }
                                                                >
                                                                    {
                                                                        arrangement
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Is it Remote, Hybrid or
                                                    On-site?
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                    <Button onClick={prev} disabled={currentStep === 0}>
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
                    </Button>
                    <Button
                        type="button"
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
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
                    </Button>
                </div>
            </div>
        </section>
    );
}
