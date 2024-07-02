import React, { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from "../ui/form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Container } from "../ui/container"; 

const GarbageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form data:", formData);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField>
          <FormItem>
            <FormLabel htmlFor="message">Message</FormLabel>
            <FormControl>
              <Input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default GarbageForm;
