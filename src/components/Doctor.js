import React from 'react';
import {
  List,
  Edit,
  SimpleForm,
  Create,
  DisabledInput,
  TextInput,
  LongTextInput,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  downloadCSV
} from 'react-admin';

import { unparse as convertToCSV } from 'papaparse/papaparse.min';

const exporter = doctors => {
  console.log(doctors);
  const doctorsForExport = doctors.map(doctor => {
    const { _id, __v, ...doctorForExport } = doctor; // omit _id and __v
    //doctor.author_name = post.author.name; // add a field
    return doctorForExport;
  });

  const exportData = [
    { id: 'S. NO', name: 'DOCTOR NAME', email: 'EMAIL', phone: 'PHONE NO', address: 'ADDRESS' }
  ].concat(doctorsForExport);
  const csv = convertToCSV(
    {
      data: exportData,
      fields: ['id', 'name', 'email', 'phone', 'address'] // order fields in the export
    },
    { header: false }
  );
  downloadCSV(csv, 'doctors'); // download as 'doctors.csv` file
};

export const DoctorList = props => (
  <List {...props} exporter={exporter} perPage={20}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="address" />
      <EditButton />
    </Datagrid>
  </List>
);

export const DoctorEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);

export const DoctorCreate = props => (
  <Create title="Add a doctor" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <LongTextInput source="address" />
    </SimpleForm>
  </Create>
);
