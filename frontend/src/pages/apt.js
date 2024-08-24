import React from "react";
import Layout from "@/components/Layout";
const DoctorCard = ({
  name,
  rating,
  specialty,
  location,
  years_of_experience,
  contact,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-accLight">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p>
        <strong>Specialty:</strong> {specialty}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Years of Experience:</strong> {years_of_experience}
      </p>
      <p>
        <strong>Rating:</strong> {rating} ⭐
      </p>
      <p>
        <strong>Contact:</strong>{" "}
        <a href={`mailto:${contact}`} className="text-blue-500">
          {contact}
        </a>
      </p>
    </div>
  );
};
const apt = () => {
  const doctors = [
    {
      name: "Dr. Emily Johnson",
      rating: 4.8,
      specialty: "Clinical Psychology",
      location: "New York, NY",
      years_of_experience: 12,
      contact: "emily.johnson@example.com",
    },
    {
      name: "Dr. Michael Smith",
      rating: 4.7,
      specialty: "Psychiatry",
      location: "San Francisco, CA",
      years_of_experience: 15,
      contact: "michael.smith@example.com",
    },
    {
      name: "Dr. Lisa Nguyen",
      rating: 4.6,
      specialty: "Counseling Psychology",
      location: "Chicago, IL",
      years_of_experience: 10,
      contact: "lisa.nguyen@example.com",
    },
    {
      name: "Dr. David Lee",
      rating: 4.9,
      specialty: "Behavioral Therapy",
      location: "Los Angeles, CA",
      years_of_experience: 20,
      contact: "david.lee@example.com",
    },
    {
      name: "Dr. Sarah Patel",
      rating: 4.5,
      specialty: "Cognitive Behavioral Therapy",
      location: "Houston, TX",
      years_of_experience: 8,
      contact: "sarah.patel@example.com",
    },
    {
      name: "Dr. James Brown",
      rating: 4.7,
      specialty: "Addiction Psychiatry",
      location: "Miami, FL",
      years_of_experience: 18,
      contact: "james.brown@example.com",
    },
    {
      name: "Dr. Anna Wilson",
      rating: 4.8,
      specialty: "Family Therapy",
      location: "Philadelphia, PA",
      years_of_experience: 14,
      contact: "anna.wilson@example.com",
    },
    {
      name: "Dr. Robert Clark",
      rating: 4.6,
      specialty: "Neuropsychology",
      location: "Boston, MA",
      years_of_experience: 11,
      contact: "robert.clark@example.com",
    },
    {
      name: "Dr. Laura Martinez",
      rating: 4.7,
      specialty: "Trauma Therapy",
      location: "Seattle, WA",
      years_of_experience: 13,
      contact: "laura.martinez@example.com",
    },
    {
      name: "Dr. Daniel Garcia",
      rating: 4.5,
      specialty: "Child and Adolescent Psychiatry",
      location: "Denver, CO",
      years_of_experience: 9,
      contact: "daniel.garcia@example.com",
    },
  ];

  return (
    <Layout pageTitle="Meet with our best doctors">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-3">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            rating={doctor.rating}
            specialty={doctor.specialty}
            location={doctor.location}
            years_of_experience={doctor.years_of_experience}
            contact={doctor.contact}
          />
        ))}
      </div>
    </Layout>
  );
};

export default apt;
