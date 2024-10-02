import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

// static data
const departmentData = [
  {
    department: 'Electrical',
    students: 90,
    faculty: 5,
  },
  {
    department: 'Mechanical',
    students: 70,
    faculty: 3,
  },
  {
    department: 'ComputerScience',
    students: 50,
    faculty: 4,
  },
  {
    department: 'Civil',
    students: 80,
    faculty: 6,
  },
];

const chartData = departmentData.map(({ department, students, faculty }) => ({
  department,
  'Student Enrollment': students,
  'Faculty Count': faculty,
}));

const lineData = [
  {
    id: 'Faculty A',
    data: [
      { x: 'Semester 1', y: 3 },
      { x: 'Semester 2', y: 4 },
      { x: 'Semester 3', y: 2 },
      { x: 'Semester 4', y: 5 },
    ],
  },
  {
    id: 'Faculty B',
    data: [
      { x: 'Semester 1', y: 5 },
      { x: 'Semester 2', y: 3 },
      { x: 'Semester 3', y: 4 },
      { x: 'Semester 4', y: 2 },
    ],
  },
];

const pieData = [
  { id: 'Electrical', label: 'Electrical', value: 500 },
  { id: 'Mechanical', label: 'Mechanical', value: 300 },
  { id: 'Computer Science', label: 'Computer Science', value: 700 },
  { id: 'Civil', label: 'Civil', value: 400 },
];

const groupedBarData = [
  {
    department: 'Electrical',
    '1st Year': 30,
    '2nd Year': 25,
    '3rd Year': 35,
  },
  {
    department: 'Mechanical',
    '1st Year': 20,
    '2nd Year': 30,
    '3rd Year': 20,
  },
  {
    department: 'Computer Science',
    '1st Year': 25,
    '2nd Year': 15,
    '3rd Year': 10,
  },
  {
    department: 'Civil',
    '1st Year': 30,
    '2nd Year': 40,
    '3rd Year': 10,
  },
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard (static)
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Student and Faculty Count per Department</Typography>
          <Box height={400}>
            <ResponsiveBar
              data={chartData}
              keys={['Student Enrollment', 'Faculty Count']}
              indexBy="department"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              colors={['#3f51b5', '#f50057']}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Department',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Count',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
              }}
              role="application"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={e => `${e.id}: ${e.formattedValue} in department: ${e.indexValue}`}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Faculty Load Trend</Typography>
          <Box height={400}>
            <ResponsiveLine
              data={lineData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false,
              }}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Semester',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Courses',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{ scheme: 'nivo' }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Books in Library by Department</Typography>
          <Box height={400}>
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: 'nivo' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: 'color' }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#333333"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">Student Count by Year and Department</Typography>
          <Box height={400}>
            <ResponsiveBar
              data={groupedBarData}
              keys={['1st Year', '2nd Year', '3rd Year']}
              indexBy="department"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              groupMode="grouped"
              colors={{ scheme: 'nivo' }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Department',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Student Count',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;