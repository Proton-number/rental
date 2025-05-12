import { Card } from "./ui/card";

function Reason() {
  const reasons = [
    {
      title: "Real-Time Listings",
      description:
        "Stay updated with the latest property listings as they go live.",
    },
    {
      title: "Instant Chat",
      description:
        "Communicate directly with landlords and agents for quick responses.",
    },
    {
      title: "Seamless Rent Management",
      description:
        "Easily manage your rent payments and lease agreements in one place.",
    },
    {
      title: "Live Listings",
      description:
        "Find properties as soon as they become available in real-time.",
    },
    {
      title: "Instant Chat",
      description:
        "Talk directly with agents, landlords, and tenants with ease.",
    },
    {
      title: "Smart Rent Management",
      description: "Get rent due reminders and pay online with a few clicks.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto text-center mb-12">
      <h3 className="text-2xl font-bold mb-8">Why Choose Rentify?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ">
        {reasons.map((reason, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-bold mb-2">{reason.title}</h2>
            <p className="text-gray-500 text-center text-sm">
              {reason.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Reason;
