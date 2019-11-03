import React from 'react';
import moment from 'moment';
import {
  List,
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  Datagrid,
  TextField,
  DateInput,
  Filter
} from 'react-admin';

const getDefaultDates = () => {
  const start_date = moment()
    .subtract(1, 'months')
    .startOf('month')
    .format('YYYY-MM-DD');

  const end_date = moment()
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD');

  return [start_date, end_date];
};

export const ReferralList = props => (
  <List
    filters={<ReferralFilter />}
    {...props}
    filterDefaultValues={{ startDate: getDefaultDates()[0], endDate: getDefaultDates()[1] }}>
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

const ReferralFilter = props => (
  <Filter {...props}>
    <DateInput source="startDate" alwaysOn />
    <DateInput source="endDate" alwaysOn />
    <ReferenceInput label="Doctor" source="doctor" reference="doctors" alwaysOn>
      <SelectInput FormHelperTextProps={{ classes: { root: 'hide-helper' } }} optionText="name" optionValue="name" />
    </ReferenceInput>
  </Filter>
);
