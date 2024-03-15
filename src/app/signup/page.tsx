import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Signup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="firstName"
            >
              First Name
            </Label>
            <Input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="firstName"
              placeholder="Enter your first name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              htmlFor="lastName"
            >
              Last Name
            </Label>
            <Input
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              id="lastName"
              placeholder="Enter your last name"
              type="text"
            />
          </div>
        </div>
        <div className="mb-6">
          <Label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor="email"
          >
            Email Address
          </Label>
          <Input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="email"
            placeholder="Enter your email address"
            type="email"
          />
        </div>
        <div className="mb-6">
          <Label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor="password"
          >
            Password
          </Label>
          <Input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="mb-6">
          <Label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </Label>
          <Input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="confirmPassword"
            placeholder="Confirm your password"
            type="password"
          />
        </div>
        <div className="mb-6">
          <Label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor="skills"
          >
            Skills
          </Label>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Please select the skills you are proficient in
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center">
                <Input
                  className="form-checkbox h-5 w-5 text-blue-500"
                  type="checkbox"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Programming
                </span>
              </Label>
            </div>
            <div>
              <Label className="flex items-center">
                <Input
                  className="form-checkbox h-5 w-5 text-blue-500"
                  type="checkbox"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Medical
                </span>
              </Label>
            </div>
            <div>
              <Label className="flex items-center">
                <Input
                  className="form-checkbox h-5 w-5 text-blue-500"
                  type="checkbox"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Plumbing
                </span>
              </Label>
            </div>
            <div>
              <Label className="flex items-center">
                <Input
                  className="form-checkbox h-5 w-5 text-blue-500"
                  type="checkbox"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Construction
                </span>
              </Label>
            </div>
            <div>
              <Label className="flex items-center">
                <Input
                  className="form-checkbox h-5 w-5 text-blue-500"
                  type="checkbox"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Virtual Assistant
                </span>
              </Label>
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
