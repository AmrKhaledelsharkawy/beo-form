import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import './index.css';


const BEOForm = () => {
  const [formData, setFormData] = useState({
    beoNumber: '',
    createdDate: '',
    eventName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    visitorBackground: '',
    visitorCategories: [],
    mainMeetingRooms: [],
    additionalMeetingRooms: [],
    typeOfEvent: '',
    objectiveOfEvent: '',
    nestleBusinessCategory: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    expectedParticipants: '',
    guaranteedParticipants: '',
    setupDate: '',
    setupTime: '',
    postEventActivities: '',
    menuSelections: [{ item: '', time: '', location: '', participants: '' }],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ''],
    }));
  };

  const removeArrayItem = (index, field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };

  const addMenuSelection = () => {
    setFormData((prevState) => ({
      ...prevState,
      menuSelections: [...prevState.menuSelections, { item: '', time: '', location: '', participants: '' }],
    }));
  };

  const removeMenuSelection = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      menuSelections: prevState.menuSelections.filter((_, i) => i !== index),
    }));
  };

  const handleMenuSelectionChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      menuSelections: prevState.menuSelections.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const renderPreview = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">BEO Preview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>BEO #:</strong> {formData.beoNumber}
        </div>
        <div>
          <strong>Created:</strong> {formData.createdDate}
        </div>
        <div>
          <strong>Event Name:</strong> {formData.eventName}
        </div>
        <div>
          <strong>Contact:</strong> {formData.contactName}
        </div>
        <div>
          <strong>Email:</strong> {formData.contactEmail}
        </div>
        <div>
          <strong>Phone:</strong> {formData.contactPhone}
        </div>
        <div>
          <strong>Visitor Background:</strong> {formData.visitorBackground}
        </div>
        <div>
          <strong>Visitor Categories:</strong> {formData.visitorCategories.join(', ')}
        </div>
        <div>
          <strong>Main Meeting Rooms:</strong> {formData.mainMeetingRooms.join(', ')}
        </div>
        <div>
          <strong>Additional Meeting Rooms:</strong> {formData.additionalMeetingRooms.join(', ')}
        </div>
        <div>
          <strong>Type of Event:</strong> {formData.typeOfEvent}
        </div>
        <div>
          <strong>Objective of Event:</strong> {formData.objectiveOfEvent}
        </div>
        <div>
          <strong>Nestlé Business Category:</strong> {formData.nestleBusinessCategory}
        </div>
        <div>
          <strong>Start Date & Time:</strong> {formData.startDate} {formData.startTime}
        </div>
        <div>
          <strong>End Date & Time:</strong> {formData.endDate} {formData.endTime}
        </div>
        <div>
          <strong>Expected Participants:</strong> {formData.expectedParticipants}
        </div>
        <div>
          <strong>Guaranteed Participants:</strong> {formData.guaranteedParticipants}
        </div>
        <div>
          <strong>Setup Date & Time:</strong> {formData.setupDate} {formData.setupTime}
        </div>
        <div>
          <strong>Post Event Activities:</strong> {formData.postEventActivities}
        </div>
      </div>
      <h3 className="text-xl font-bold mt-4 mb-2">Menu Selections</h3>
      <div className="grid grid-cols-4 gap-2 font-bold">
        <div>Item</div>
        <div>Time</div>
        <div>Location</div>
        <div>Participants</div>
      </div>
      {formData.menuSelections.map((selection, index) => (
        <div key={index} className="grid grid-cols-4 gap-2">
          <div>{selection.item}</div>
          <div>{selection.time}</div>
          <div>{selection.location}</div>
          <div>{selection.participants}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">BEO Form</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="beoNumber" className="block text-sm font-medium text-gray-700">
              BEO Number
            </label>
            <input
              type="text"
              id="beoNumber"
              name="beoNumber"
              value={formData.beoNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="createdDate" className="block text-sm font-medium text-gray-700">
              Created Date
            </label>
            <input
              type="date"
              id="createdDate"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="visitorBackground" className="block text-sm font-medium text-gray-700">
            Visitor Background
          </label>
          <select
            id="visitorBackground"
            name="visitorBackground"
            value={formData.visitorBackground}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select background</option>
            <option value="Management">Management</option>
            <option value="Marketing">Marketing</option>
            <option value="Scientific">Scientific</option>
            <option value="Technical">Technical</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Visitor Categories</label>
          <div className="mt-1 space-y-2">
            {formData.visitorCategories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => handleArrayInputChange(e, index, 'visitorCategories')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'visitorCategories')}
                  className="text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('visitorCategories')}
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} className="mr-1" /> Add Category
            </button>
          </div>
        </div>

        {/* Add more form fields here */}

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Menu Selections</h3>
          {formData.menuSelections.map((selection, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item</label>
                <input
                  type="text"
                  value={selection.item}
                  onChange={(e) => handleMenuSelectionChange(e, index, 'item')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={selection.time}
                  onChange={(e) => handleMenuSelectionChange(e, index, 'time')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={selection.location}
                  onChange={(e) => handleMenuSelectionChange(e, index, 'location')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Participants</label>
                <input
                  type="number"
                  value={selection.participants}
                  onChange={(e) => handleMenuSelectionChange(e, index, 'participants')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMenuSelection(index)}
                className="md:col-span-4 text-red-500 flex items-center justify-center"
              >
                <X size={20} className="mr-1" /> Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMenuSelection}
            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={16} className="mr-1" /> Add Menu Selection
          </button>
        </div>
      </form>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showPreview ? (
            <>
              <ChevronUp size={20} className="mr-2" />
              Hide Preview
            </>
          ) : (
            <>
              <ChevronDown size={20} className="mr-2" />
              Show Preview
            </>
          )}
        </button>
        {showPreview && renderPreview()}
      </div>
    </div>
  );
};

export default BEOForm;
