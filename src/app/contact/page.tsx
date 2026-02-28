import React from "react";
import ContactPageClient from "@/components/contact/ContactPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Un projet, une question ou une opportunité ? Envoyez-moi un message via le formulaire sécurisé.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
