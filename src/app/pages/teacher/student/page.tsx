"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { insertStudentInterface, studentInterface } from "@/app/types/student.type";
import { successAlert, errorAlert, confirmAlert } from "@/app/utils/alert";
import axios from "axios";
import { backendUrl } from "@/app/utils/url";

// shadcn components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// lucide
import { PlusCircle, Search, Users, Trash } from "lucide-react";

export default function Page() {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [contact, setContact] = useState("");
  const [section, setSection] = useState("");
  const [search, setSearch] = useState("");

  const [students, setStudents] = useState<studentInterface[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: () => axios.get(backendUrl("/student")),
  });

  useEffect(() => {
    if (data?.data) {
      setStudents(data.data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (student: insertStudentInterface) =>
      axios.post(backendUrl("/student"), { student }),
    onSuccess: () => {
      successAlert("Student added");
      refetch();
      setName("");
      setParent("");
      setContact("");
      setSection("");
    },
    onError: () => {
      errorAlert("Failed to add student");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.delete(backendUrl("/student/" + id)),
    onSuccess: () => {
      successAlert("Student removed");
      refetch();
    },
    onError: () => {
      errorAlert("Failed to remove student");
    },
  });

  const handleAdd = () => {
    if (!name || !parent || !contact || !section) {
      errorAlert("All fields are required");
      return;
    }
    mutation.mutate({ name, parent, contact, section });
  };

  const handleDelete = (id: string) => {
    confirmAlert("Do you want to remove this student?", "Remove", () => {
      deleteMutation.mutate(id);
    });
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-stone-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Add Student */}
        <Card className="shadow-md rounded-2xl h-[650px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-red-900">
              <PlusCircle className="w-5 h-5 text-red-600" />
              Add Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Parent"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />


              {/* Section Dropdown */}
              <Select value={section} onValueChange={setSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Humss">Humss</SelectItem>
                  <SelectItem value="Cookery">Cookery</SelectItem>
                </SelectContent>
              </Select>

            </div>
           

           

            <Button
              onClick={handleAdd}
              className="w-full bg-red-900 hover:bg-red-800"
            >
              Add Student
            </Button>
          </CardContent>
        </Card>

     

        {/* Right column - Student List */}
        <Card className="shadow-md rounded-2xl  h-[650px] overflow-auto" >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-red-900">
              <Users className="w-5 h-5 text-red-600" />
              Student List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody  >
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.parent}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(student._id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
