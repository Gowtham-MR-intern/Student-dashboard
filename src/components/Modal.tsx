import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Form,
  Select,
  SelectItem,
} from "@heroui/react";

type Student = {
  id: string;
  name: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
};

type AddStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Omit<Student, "id">) => void;
  onUpdateStudent: (id: string, student: Omit<Student, "id">) => void;
  studentData?: Student | null;
};

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAddStudent, onUpdateStudent, studentData }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Student>();

  // const onSubmit = (data: Student) => {
  //   alert(JSON.stringify(data));
  // }; 

  useEffect(() => {
    if (studentData) {
      setName(studentData.name);
      setGender(studentData.gender);
      setPhone(studentData.phone);
      setEmail(studentData.email);
      setAddress(studentData.address);
      setIsActive(studentData.isActive);
    } 
    else {
      if(isOpen){
        setName("");
        setGender("");
        setPhone("");
        setEmail("");
        setAddress("");
        setIsActive(true);
      }
    }
  }, [studentData,isOpen]);

  const handleAddStudent: SubmitHandler<Student> = async() => {
    if (!name || !gender || !phone || !email || !address) {
      alert("All fields are required.");
      return;
    }
    if(studentData){
      const student = { name, gender, phone, email, address, isActive };
      onUpdateStudent(studentData.id, student);
    }
    else{
      onAddStudent({ name, gender, phone, email, address, isActive });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{studentData ? "Edit Student" : "Add New Student"}</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit(handleAddStudent)} className="flex flex-col gap-2">
              <Input
                label="Name"
                isRequired
                placeholder="Enter your name"
                value={name}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                  maxLength: { value: 20, message: "Name cannot exceed 20 characters" },
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters and spaces allowed",
                  },
                })}
                labelPlacement="outside"
                onChange={(e) => setName(e.target.value)}
              />

              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              <Select
                isRequired
                label="Gender"
                labelPlacement="outside"
                selectedKeys={[gender]}
                placeholder="Select gender"
                onSelectionChange={(selected) => setGender(Array.from(selected)[0] as string)}
              >
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
                <SelectItem key="other">Other</SelectItem>
              </Select>

              <Input
                label="Phone"
                placeholder="Enter phone"
                value={phone}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Phone number must be exactly 10 digits",
                  },
                })}
                labelPlacement="outside"
                onChange={(e) => setPhone(e.target.value)}
                isRequired
                type="number"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

              <Input
                label="Email"
                placeholder="Enter email"
                value={email}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                labelPlacement="outside"
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                type="email"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              
              <Input
                label="Address"
                placeholder="Enter address"
                value={address}
                {...register("address", {
                  required: "Address is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                labelPlacement="outside"
                onChange={(e) => setAddress(e.target.value)}
                isRequired
              />
              {errors.address && <p className="text-red-500">{errors.address.message}</p>}

              <Select
                  isRequired
                  label="Is Active"
                  labelPlacement="outside"
                  selectedKeys={isActive ? ["active"] : ["inactive"]}
                  placeholder="Select one"
                  onSelectionChange={(selected) => {
                    const value = Array.from(selected)[0] as string;
                    setIsActive(value === "active");
                  }}
                >
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="inactive">Inactive</SelectItem>
              </Select>

              <div className="ml-auto">
                <Button
                  type="submit"
                  variant="flat"
                  className="bg-[#33a5a0] text-white mt-2 mx-4 transition">
                  Submit
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddStudentModal;