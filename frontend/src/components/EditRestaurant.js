import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateRestaurant, getRestaurants } from '../services/api';
import { useParams } from 'react-router-dom';

const EditRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data } = await getRestaurants({ id });
      setRestaurant(data);
    };
    fetchRestaurant();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    category: Yup.string().required('Category is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateRestaurant(id, values);
      alert('Restaurant updated successfully');
    } catch (error) {
      console.error('Error updating restaurant', error);
      alert('Failed to update restaurant');
    } finally {
      setSubmitting(false);
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <Formik
      initialValues={restaurant}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label>Description</label>
            <Field name="description" type="text" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label>Location</label>
            <Field name="location" type="text" />
            <ErrorMessage name="location" component="div" />
          </div>

          <div>
            <label>Category</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>Update Restaurant</button>
        </Form>
      )}
    </Formik>
  );
};

export default EditRestaurant;
