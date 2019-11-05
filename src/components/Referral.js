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
  Filter,
  downloadCSV
} from 'react-admin';

import { unparse as convertToCSV } from 'papaparse/papaparse.min';

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

const exporter = referrals => {
  const exportData = [];
  const doctors = {};

  referrals.forEach(referral => {
    if (!doctors[referral.doctor]) {
      const doctorRow = {};
      doctorRow.doctor = referral.doctor;
      doctorRow[referral.referralType] = Number(referral.referralUnit);
      doctors[referral.doctor] = doctorRow;
    } else {
      const doctorRow = doctors[referral.doctor];
      doctorRow[referral.referralType] = doctorRow[referral.referralType]
        ? Number(doctorRow[referral.referralType]) + Number(referral.referralUnit)
        : Number(referral.referralUnit);
    }
  });

  Object.keys(doctors).forEach(function(doctor) {
    exportData.push(doctors[doctor]);
  });

  const csv = convertToCSV({
    data: exportData,
    fields: ['doctor', 'Bloodtest', 'Ultrasound', 'X-Ray'] // order fields in the export
  });
  downloadCSV(csv, 'total-referrals'); // download as 'total-referrals.csv` file
};

export const ReferralList = props => (
  <List
    filters={<ReferralFilter />}
    {...props}
    filterDefaultValues={{ startDate: getDefaultDates()[0], endDate: getDefaultDates()[1] }}
    exporter={exporter}
    perPage={200}
    sort={{ field: 'timestamp', order: 'DESC' }}>
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
