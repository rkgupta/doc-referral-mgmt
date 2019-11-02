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
  EditButton
} from 'react-admin';

export const DoctorList = props => (
  <List {...props}>
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
