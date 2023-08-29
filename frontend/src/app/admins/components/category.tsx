"use client"
import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  subCategory: { _id: string; name: string }[];
  brands: { _id: string; name: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newSubCategory, setNewSubCategory] = useState<string>('');
  const [newBrand, setNewBrand] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${process.env.server}/products/v1/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleAddSubCategory = () => {
    if (selectedCategory && newSubCategory) {
      const updatedCategory = { ...selectedCategory };
      updatedCategory.subCategory.push({ _id: new Date().getTime().toString(), name: newSubCategory });
      setSelectedCategory(updatedCategory);
      setNewSubCategory('');
    }
  };

  const handleAddBrand = () => {
    if (selectedCategory && newBrand) {
      const updatedCategory = { ...selectedCategory };
      updatedCategory.brands.push({ _id: new Date().getTime().toString(), name: newBrand });
      setSelectedCategory(updatedCategory);
      setNewBrand('');
    }
  };

  return (
    <div>
      <h1>Category</h1>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-categories">
          Select Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((category) => (
            <Dropdown.Item key={category._id} onClick={() => handleCategorySelect(category)}>
              {category.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Form>
        <Form.Group className='w-25 py-4'>
          <Form.Label>Add </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subcategory"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
          />
          <Button variant="primary" onClick={handleAddSubCategory}>
          Add
        </Button>
        </Form.Group>
        
      </Form>
      <Form className='w-25 py-4'>
        <Form.Group>
          <Form.Label>Add Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddBrand}>
          Add Brand
        </Button>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Subcategories</th>
            <th>Brands</th>
          </tr>
        </thead>
        <tbody>
          {selectedCategory?.subCategory.map((subCategory) => (
            <tr key={subCategory._id}>
              <td>{subCategory.name}</td>
              <td>
                {selectedCategory.brands.map((brand) => (
                  <div key={brand._id}>{brand.name}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
     
    </div>
  );
}
