import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, IconButton, MenuItem, Stepper, Step, StepLabel, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, LinearProgress, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import jsPDF from 'jspdf';

const steps = ['General Information', 'Event Details', 'Additional Information'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState({ field: '', open: false });
  const [formData, setFormData] = useState({
    postAs: '',
    address: '',
    contact: '',
    email: '',
    phone: '',
    background: '',
    backgroundOther: '',
    category: '',
    categoryOther: '',
    mainRoom: '',
    mainRoomOther: '',
    additionalRoom: '',
    additionalRoomOther: '',
    eventType: '',
    objectives: [''],
    businessCategory: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    exp: '',
    gtd: '',
    setDate: '',
    setTime: '',
    postEvent: [''],
    fbOffer: '',
    fbTime: '',
    location: '',
    participants: '',
    equipment: [''],
    language: '',
    itSupport: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDynamicChange = (index, e, field) => {
    const newFields = [...formData[field]];
    newFields[index] = e.target.value;
    setFormData({ ...formData, [field]: newFields });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeField = (index, field) => {
    const newFields = [...formData[field]];
    newFields.splice(index, 1);
    setFormData({ ...formData, [field]: newFields });
  };

  const handleDialogOpen = (field) => {
    setOpenDialog({ field, open: true });
  };

  const handleDialogClose = () => {
    setOpenDialog({ field: '', open: false });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(formData);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('BOE Form Data', 10, 10);

    let yPosition = 20;

    doc.setFontSize(12);
    doc.text(`Post As: ${data.postAs}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Address: ${data.address}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Contact: ${data.contact}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Email: ${data.email}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Phone: ${data.phone}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Visitor’s Background: ${data.background}`, 10, yPosition);
    if (data.background === 'Other') {
      yPosition += 10;
      doc.text(` - Other: ${data.backgroundOther}`, 10, yPosition);
    }
    yPosition += 10;

    doc.text(`Visitor’s Categories: ${data.category}`, 10, yPosition);
    if (data.category === 'Other') {
      yPosition += 10;
      doc.text(` - Other: ${data.categoryOther}`, 10, yPosition);
    }
    yPosition += 10;

    doc.text(`Main Meeting Rooms: ${data.mainRoom}`, 10, yPosition);
    if (data.mainRoom === 'Other') {
      yPosition += 10;
      doc.text(` - Other: ${data.mainRoomOther}`, 10, yPosition);
    }
    yPosition += 10;

    doc.text(`Additional Meeting Rooms: ${data.additionalRoom}`, 10, yPosition);
    if (data.additionalRoom === 'Other') {
      yPosition += 10;
      doc.text(` - Other: ${data.additionalRoomOther}`, 10, yPosition);
    }
    yPosition += 10;

    doc.text(`Type of Event: ${data.eventType}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Objective of the Event:`, 10, yPosition);
    yPosition += 10;
    data.objectives.forEach((obj) => {
      doc.text(` - ${obj}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`Nestlé Business Category: ${data.businessCategory}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Start Date: ${data.startDate}`, 10, yPosition);
    yPosition += 10;

    doc.text(`End Date: ${data.endDate}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Start Time: ${data.startTime}`, 10, yPosition);
    yPosition += 10;

    doc.text(`End Time: ${data.endTime}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Expected Number of Guests: ${data.exp}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Guaranteed Number of Guests: ${data.gtd}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Setup Date: ${data.setDate}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Setup Time: ${data.setTime}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Post Event Activities:`, 10, yPosition);
    yPosition += 10;
    data.postEvent.forEach((act) => {
      doc.text(` - ${act}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`F&B Offer: ${data.fbOffer}`, 10, yPosition);
    yPosition += 10;

    doc.text(`F&B Time: ${data.fbTime}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Location: ${data.location}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Number of Participants: ${data.participants}`, 10, yPosition);
    yPosition += 10;

    doc.text(`Requested Equipment:`, 10, yPosition);
    yPosition += 10;
    data.equipment.forEach((equip) => {
      doc.text(` - ${equip}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`Language: ${data.language}`, 10, yPosition);
    yPosition += 10;

    doc.text(`IT Support: ${data.itSupport}`, 10, yPosition);
    yPosition += 10;

    doc.save('boe-form.pdf');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column">
        <Typography variant="h4" gutterBottom>
          BOE Form
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel style={{ width: '100%', marginBottom: '20px' }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <LinearProgress variant="determinate" value={(activeStep / (steps.length - 1)) * 100} style={{ width: '100%', marginBottom: '20px' }} />
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="Post As / Event" name="postAs" value={formData.postAs} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required>
                  <MenuItem value="VCLB">VCLB</MenuItem>
                  <MenuItem value="EPFL">EPFL</MenuItem>
                  <MenuItem value="Vevey">Vevey</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Contact (Name + Surname)" name="contact" value={formData.contact} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth required />
              </Grid>
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField select label="Visitor's Background" name="background" value={formData.background} onChange={handleChange} fullWidth required>
                  <MenuItem value="Management">Management</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Scientific">Scientific</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                {formData.background === 'Other' && (
                  <TextField label="If Other, specify" name="backgroundOther" value={formData.backgroundOther} onChange={handleChange} fullWidth style={{ marginTop: '10px' }} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Visitor's Categories" name="category" value={formData.category} onChange={handleChange} fullWidth required>
                  <MenuItem value="VVIP">VVIP</MenuItem>
                  <MenuItem value="Nestlé's external VIP">Nestlé's external VIP</MenuItem>
                  <MenuItem value="Nestlé's internal VIP">Nestlé's internal VIP</MenuItem>
                  <MenuItem value="KOLs">KOLs</MenuItem>
                  <MenuItem value="Students">Students</MenuItem>
                  <MenuItem value="Customers">Customers</MenuItem>
                  <MenuItem value="Media">Media</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                {formData.category === 'Other' && (
                  <TextField label="If Other, specify" name="categoryOther" value={formData.categoryOther} onChange={handleChange} fullWidth style={{ marginTop: '10px' }} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Main Meeting Rooms" name="mainRoom" value={formData.mainRoom} onChange={handleChange} fullWidth required>
                  <MenuItem value="Pasteur">Pasteur</MenuItem>
                  <MenuItem value="Foyer Pasteur">Foyer Pasteur</MenuItem>
                  <MenuItem value="Marie Curie (Y-S 30)">Marie Curie (Y-S 30)</MenuItem>
                  <MenuItem value="Accelerator">Accelerator</MenuItem>
                  <MenuItem value="Creative Food Lab">Creative Food Lab</MenuItem>
                  <MenuItem value="Creative 4 You">Creative 4 You</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                {formData.mainRoom === 'Other' && (
                  <TextField label="If Other, specify" name="mainRoomOther" value={formData.mainRoomOther} onChange={handleChange} fullWidth style={{ marginTop: '10px' }} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Additional Meeting Rooms" name="additionalRoom" value={formData.additionalRoom} onChange={handleChange} fullWidth required>
                  <MenuItem value="Y-R 10">Y-R 10</MenuItem>
                  <MenuItem value="Y-R 14">Y-R 14</MenuItem>
                  <MenuItem value="Y-S 38">Y-S 38</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                {formData.additionalRoom === 'Other' && (
                  <TextField label="If Other, specify" name="additionalRoomOther" value={formData.additionalRoomOther} onChange={handleChange} fullWidth style={{ marginTop: '10px' }} />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Type of Event" name="eventType" value={formData.eventType} onChange={handleChange} fullWidth required>
                  <MenuItem value="Meeting + Food & Beverage">Meeting + Food & Beverage</MenuItem>
                  <MenuItem value="Food & Beverage (Only)">Food & Beverage (Only)</MenuItem>
                  <MenuItem value="VIP Visit">VIP Visit</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Objective of the Event:</Typography>
                {formData.objectives.map((objective, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={10}>
                      <TextField label="Objective" value={objective} onChange={(e) => handleDynamicChange(index, e, 'objectives')} fullWidth required />
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => addField('objectives')}>
                        <AddIcon />
                      </IconButton>
                      {formData.objectives.length > 1 && (
                        <IconButton onClick={() => removeField(index, 'objectives')}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField label="Nestlé Business Category" name="businessCategory" value={formData.businessCategory} onChange={handleChange} fullWidth required />
              </Grid>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Start Time" name="startTime" type="time" value={formData.startTime} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="End Time" name="endTime" type="time" value={formData.endTime} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Expected Number of Guests" name="exp" type="number" value={formData.exp} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Guaranteed Number of Guests" name="gtd" type="number" value={formData.gtd} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Setup Date" name="setDate" type="date" value={formData.setDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Setup Time" name="setTime" type="time" value={formData.setTime} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Post Event Activities:</Typography>
                {formData.postEvent.map((activity, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={10}>
                      <TextField label="Activity" value={activity} onChange={(e) => handleDynamicChange(index, e, 'postEvent')} fullWidth required />
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => addField('postEvent')}>
                        <AddIcon />
                      </IconButton>
                      {formData.postEvent.length > 1 && (
                        <IconButton onClick={() => removeField(index, 'postEvent')}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField label="F&B Offer" name="fbOffer" value={formData.fbOffer} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="F&B Time" name="fbTime" type="time" value={formData.fbTime} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Number of Participants" name="participants" type="number" value={formData.participants} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Requested Equipment:</Typography>
                {formData.equipment.map((equip, index) => (
                  <Grid container spacing={1} key={index} alignItems="center">
                    <Grid item xs={10}>
                      <TextField label="Equipment" value={equip} onChange={(e) => handleDynamicChange(index, e, 'equipment')} fullWidth required />
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => addField('equipment')}>
                        <AddIcon />
                      </IconButton>
                      {formData.equipment.length > 1 && (
                        <IconButton onClick={() => removeField(index, 'equipment')}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Language" name="language" value={formData.language} onChange={handleChange} fullWidth required>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Francais">Francais</MenuItem>
                  <MenuItem value="Deutsch">Deutsch</MenuItem>
                  <MenuItem value="Espanol">Espanol</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField select label="IT Support" name="itSupport" value={formData.itSupport} onChange={handleChange} fullWidth required>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </form>
        <Dialog open={openDialog.open} onClose={handleDialogClose}>
          <DialogTitle>Add New {openDialog.field}</DialogTitle>
          <DialogContent>
            <List>
              {formData[openDialog.field] && formData[openDialog.field].map((field, index) => (
                <ListItem key={index}>
                  <TextField
                    label={`New ${openDialog.field}`}
                    value={field}
                    onChange={(e) => handleDynamicChange(index, e, openDialog.field)}
                    fullWidth
                  />
                  <IconButton onClick={() => addField(openDialog.field)}>
                    <AddIcon />
                  </IconButton>
                  {formData[openDialog.field].length > 1 && (
                    <IconButton onClick={() => removeField(index, openDialog.field)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default App;
