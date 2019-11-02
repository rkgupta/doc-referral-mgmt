import React from 'react';
import { List, Create, SimpleForm, ReferenceInput, SelectInput, TextInput, Datagrid, TextField } from 'react-admin';

export const ReferralList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="doctor" />
      <TextField source="referralType" />
      <TextField source="referralUnit" />
      <TextField source="timestamp" />
    </Datagrid>
  </List>
);

export const ReferralCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Doctor" source="doctor" reference="doctors">
        <SelectInput FormHelperTextProps={{ classes: { root: 'hide-helper' } }} optionText="name" optionValue="name" />
      </ReferenceInput>
      <SelectInput
        source="referralType"
        choices={[
          { id: 'X-Ray', name: 'X-Ray' },
          { id: 'Ultrasound', name: 'Ultrasound' },
          { id: 'Blood Test', name: 'Blood Test' }
        ]}
      />
      <TextInput source="referralUnit" />
    </SimpleForm>
  </Create>
);
