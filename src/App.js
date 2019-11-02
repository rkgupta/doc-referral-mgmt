import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from 'ra-data-json-server';
import { ReferralList, ReferralCreate } from './components/Referral';
import { DoctorList, DoctorEdit, DoctorCreate } from './components/Doctor';

import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';

const dataProvider = jsonServerProvider('http://localhost:8080/api');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="doctors" list={DoctorList} edit={DoctorEdit} create={DoctorCreate} icon={GroupAddOutlinedIcon} />
    <Resource name="prescriptions" list={ReferralList} create={ReferralCreate} icon={EventNoteOutlinedIcon} />
  </Admin>
);

export default App;
