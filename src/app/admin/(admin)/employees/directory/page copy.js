"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";

// Dummy Employees (replace API later)
const dummyEmployees = [
    {
        id: 1,
        name: "Virendra Nishad",
        email: "virendra@example.com",
        department: "Engineering",
        status: "Active",
        avatar: "",
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya@example.com",
        department: "HR",
        status: "Inactive",
        avatar: "",
    },
    {
        id: 3,
        name: "Amit Verma",
        email: "amit@example.com",
        department: "Finance",
        status: "Active",
        avatar: "",
    },
];

const EmployeeDirectory = () => {

    const router = useRouter();


    const [searchTerm, setSearchTerm] = useState("");
    const [department, setDepartment] = useState("all");
    const [status, setStatus] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    // Filter employees
    const filteredEmployees = dummyEmployees.filter((emp) => {
        return (
            (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emp.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (department === "all" || emp.department === department) &&
            (status === "all" || emp.status === status)
        );
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredEmployees.length / perPage);
    const paginatedData = filteredEmployees.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Employee Directory</h1>
                <Button>Add Employee</Button>
            </div>

            {/* Filters Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>

                <CardContent className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email"
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Department Filter */}
                    <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Status Filter */}
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Reset Filters */}
                    <Button variant="outline" onClick={() => {
                        setSearchTerm("");
                        setDepartment("all");
                        setStatus("all");
                    }}>
                        Reset Filters
                    </Button>
                </CardContent>
            </Card>

            {/* Employee List Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Employees</CardTitle>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}

                            {paginatedData.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={emp.avatar} />
                                                <AvatarFallback>
                                                    {emp.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-medium">{emp.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>{emp.email}</TableCell>

                                    <TableCell>{emp.department}</TableCell>

                                    <TableCell>
                                        <Badge
                                            variant={emp.status === "Active" ? "default" : "destructive"}
                                        >
                                            {emp.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.push(`/admin/employees/profile/${emp.id}`)}
                                        >
                                            View
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            <ChevronLeft className="h-4 w-4" /> Prev
                        </Button>

                        <p className="text-sm">
                            Page {currentPage} of {totalPages}
                        </p>

                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default EmployeeDirectory;
