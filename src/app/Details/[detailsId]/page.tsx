"use client";

import { sanityStore } from "@/store/sanityStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Bed,
  Bath,
  Car,
  Square,
  Calendar,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  CheckCircle,
  Camera,
  Eye,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconBounce = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 },
  },
};

function Detail() {
  const { detailsId } = useParams();
  const { singleProperties, fetchSingleProperties, agent, fetchAgent } =
    sanityStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (detailsId && typeof detailsId === "string") {
      fetchSingleProperties(detailsId);
    }
  }, [detailsId, fetchSingleProperties, fetchAgent]);

  useEffect(() => {
    if (singleProperties?.author?._id) {
      fetchAgent(singleProperties.author._id);
    }
  }, [singleProperties?.author?._id, fetchAgent]);



  if (!singleProperties) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading property details...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  const images =
    singleProperties.propertyGallery ||
    [singleProperties.mainImage].filter(Boolean);

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Header with back button */}
      <motion.div
        className=" border-b sticky top-0 z-10 backdrop-blur-sm bg-white/95"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Properties
            </Button>
          </motion.div>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? "text-red-500" : ""}
              >
                <motion.div
                  animate={isFavorited ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={18}
                    fill={isFavorited ? "currentColor" : "none"}
                  />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="sm">
                <Share2 size={18} />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              className="bg-white rounded-xl overflow-hidden shadow-sm"
              variants={fadeInUp}
            >
              {images.length > 0 && (
                <>
                  <div className="relative h-96 bg-gray-200 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={
                            images[selectedImageIndex]?.asset?.url ||
                            images[0]?.asset?.url
                          }
                          alt={singleProperties.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge className="bg-emerald-500 text-white">
                        {singleProperties.propertyType}
                      </Badge>
                    </motion.div>

                    <motion.div
                      className="absolute top-4 right-4 flex flex-col gap-2"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Eye size={12} />
                        {/* {singleProperties.viewCount} views */}
                      </div>
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                        <Clock size={12} />
                        {/* {singleProperties.lastUpdated} */}
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm flex items-center gap-1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Camera size={14} />
                      {images.length} Photos
                    </motion.div>
                  </div>
                  {/* Thumbnail Navigation */}

                  {images.length > 1 && (
                    <motion.div
                      className="p-4 flex gap-2 overflow-x-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {images.map(
                        (image: { asset: { url: string } }, index: number) => (
                          <motion.button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative h-16 w-20 rounded-md overflow-hidden flex-shrink-0 ${
                              selectedImageIndex === index
                                ? "ring-2 ring-emerald-500"
                                : ""
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <Image
                              src={image.asset.url}
                              alt={`Property image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </motion.button>
                        )
                      )}
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>

            {/* Property Info */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              variants={fadeInUp}
            >
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4"
                variants={slideInLeft}
              >
                <div>
                  <motion.h1
                    className="text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {singleProperties.title}
                  </motion.h1>
                  <motion.div
                    className="flex items-center text-gray-600 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <MapPin size={16} className="mr-1" />
                    <span>{singleProperties.location}</span>
                  </motion.div>
                </div>
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="text-3xl font-bold text-emerald-600"
                    whileHover={{ scale: 1.05 }}
                  >
                   $ {singleProperties.price}
                  </motion.div>
                  <div className="text-sm text-gray-500">
                    {singleProperties.priceType}
                  </div>
                </motion.div>
              </motion.div>

              {/* Property Stats */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  {
                    icon: Bed,
                    value: singleProperties.bedrooms,
                    label: "Bedrooms",
                  },
                  {
                    icon: Bath,
                    value: singleProperties.bathrooms,
                    label: "Bathrooms",
                  },
                  {
                    icon: Car,
                    value: singleProperties.parking,
                    label: "Parking",
                  },
                  { icon: Square, value: singleProperties.area, label: "Area" },
                ].map(({ icon: Icon, value, label }, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer"
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "#f0fdf4",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div variants={iconBounce} whileHover="animate">
                      <Icon size={20} className="text-emerald-600" />
                    </motion.div>
                    <div>
                      <div className="font-semibold">{value}</div>
                      <div className="text-sm text-gray-600">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Info */}
              <motion.div
                className="grid sm:grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="flex justify-between py-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-gray-600">Furnished:</span>
                  <span className="font-medium">
                    {singleProperties.furnished}
                  </span>
                </motion.div>
                <motion.div
                  className="flex justify-between py-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-gray-600">Available:</span>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    <Calendar size={12} className="mr-1" />
                    {singleProperties.availability}
                  </Badge>
                </motion.div>
              </motion.div>

              <Separator className="mb-6" />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="prose prose-gray max-w-none">
                  <PortableText value={singleProperties.body} />
                </div>
              </motion.div>
            </motion.div>

            {/* Features & Amenities */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              variants={fadeInUp}
            >
              <motion.h3
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Features & Amenities
              </motion.h3>
              <motion.div
                className="grid sm:grid-cols-2 gap-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {singleProperties.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    variants={fadeInUp}
                    whileHover={{
                      backgroundColor: "#f0fdf4",
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                    >
                      <CheckCircle size={16} className="text-emerald-500" />
                    </motion.div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Nearby Places */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm"
              variants={fadeInUp}
            >
              <motion.h3
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                What's Nearby
              </motion.h3>
              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {singleProperties.nearbyPlaces?.map((place, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg"
                    variants={fadeInUp}
                    whileHover={{
                      backgroundColor: "#f0fdf4",
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                    >
                      <MapPin size={16} className="text-emerald-500" />
                    </motion.div>
                    <span className="text-gray-700">{place}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar - Agent Info */}
          <motion.div className="space-y-6" variants={slideInRight}>
            {/* Agent Card */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Avatar className="h-20 w-20 mx-auto mb-4 bg-emerald-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white text-2xl flex items-center justify-center h-full w-full"
                  >
                    <Image
                      src={agent?.authorImage || "/placeholder-avatar.jpg"}
                      alt={`${agent?.name || "Agent"}'s profile picture`}
                      width={80}
                      height={80}
                    />
                  </motion.div>
                </Avatar>
                <motion.h3
                  className="text-xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {agent?.name}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {agent?.title}
                </motion.p>

                {/* <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {singleProperties.agent.responseTime}
                </motion.p> */}
              </motion.div>

              {/* Agent Stats */}
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  {
                    value: agent?.yearsExperience,
                    label: "Years Experience",
                  },
                  {
                    value: agent?.totalProperties,
                    label: "Properties Listed",
                  },
                ].map(({ value, label }, index) => (
                  <motion.div
                    key={label}
                    className="text-center p-3 bg-gray-50 rounded-lg"
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "#f0fdf4",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="font-semibold text-lg">{value}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Buttons */}
              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  {
                    icon: MessageCircle,
                    text: "WhatsApp",
                    variant: "outline",
                    href: `https://wa.me/${agent?.phone?.replace(/\D/g, "")}`,
                  },
                  {
                    icon: Mail,
                    text: "Send Email",
                    variant: "outline",
                    href: `mailto:${agent?.email}`,
                  },
                  {
                    icon: Calendar,
                    text: "Schedule Visit",
                    variant: "outline",
                    href: "#schedule-visit", // You can replace with your scheduling link
                  },
                ].map(({ icon: Icon, text, variant, href }, index) => (
                  <motion.div
                    key={text}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full ${
                        variant === "primary"
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : ""
                      }`}
                      variant={variant === "primary" ? "default" : "outline"}
                      onClick={() => window.open(href, "_blank")}
                    >
                      <Icon size={18} className="mr-2" />
                      {text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              <Separator className="my-6" />

              {/* Contact Info */}
              <motion.div
                className="space-y-3 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone size={16} className="text-gray-400" />
                  <span>{agent?.phone}</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail size={16} className="text-gray-400" />
                  <span>{agent?.email}</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Detail;
