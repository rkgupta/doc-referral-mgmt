import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { ReferralList, ReferralCreate } from './components/Referral';
import { DoctorList, DoctorEdit, DoctorCreate } from './components/Doctor';
import CustomLayout from './components/CustomLayout';
import authProvider from './components/auth-provider';

import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
require('dotenv').config();
const dataProvider = jsonServerProvider('http://localhost:8080/api');

const App = () => (
  <Admin appLayout={CustomLayout} authProvider={authProvider} dataProvider={dataProvider}>
    <Resource name="doctors" list={DoctorList} edit={DoctorEdit} create={DoctorCreate} icon={GroupAddOutlinedIcon} />
    <Resource name="referrals" list={ReferralList} create={ReferralCreate} icon={EventNoteOutlinedIcon} />
  </Admin>
);

export default App;
