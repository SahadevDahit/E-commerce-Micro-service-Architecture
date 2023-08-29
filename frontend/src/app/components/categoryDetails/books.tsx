"use client"
import React from 'react'
interface booksComponent{
    details:any
}
const books: React.FC<booksComponent> = ({ details }) => {
  return (
    <>
    <h6>author: {details.author}</h6>
    <h6>edition: {details.edition}</h6>
    <h6>isbn: {details.isbn}</h6>
    <h6>language: {details.language}</h6>
    <h6>paperback: {details.paperback}</h6>
    <h6>publisher: {details.publisher}</h6>
    <h6>title: {details.title}</h6>
    </>
  )
}

export default books

