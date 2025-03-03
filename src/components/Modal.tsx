import React, { useState, useEffect } from "react";
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

  const handleAddStudent = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
              <Form onSubmit={handleAddStudent} className="flex flex-col gap-2">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={name}
                labelPlacement="outside"
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
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
                labelPlacement="outside"
                onChange={(e) => setPhone(e.target.value)}
                isRequired
                type="number"
              />
              <Input
                label="Email"
                placeholder="Enter email"
                value={email}
                labelPlacement="outside"
                onChange={(e) => setEmail(e.target.value)}
                isRequired
                type="email"
              />
              <Input
                label="Address"
                placeholder="Enter address"
                value={address}
                labelPlacement="outside"
                onChange={(e) => setAddress(e.target.value)}
                isRequired
              />
              <label>
                <input
                  type="checkbox"
                  checked={isActive}
                  className="size-4 mr-2"
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                Active
              </label>
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