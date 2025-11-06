"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { useState, useEffect } from "react";
import { fetchPublications, Publication } from "@/lib/scholarApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Facebook,
  Instagram,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  ArrowUp,
  Mail,
  GraduationCap,
} from "lucide-react";

const getSocialIcon = (iconName: string) => {
  const iconProps = {
    size: 20,
    className: "text-gray-400 hover:text-[rgb(49,132,128)] transition-colors",
  };

  switch (iconName) {
    case "facebook":
      return <Facebook {...iconProps} />;
    case "instagram":
      return <Instagram {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "twitter":
      return <Twitter {...iconProps} />;
    case "email":
      return <Mail {...iconProps} />;
    case "scholar":
      return <GraduationCap {...iconProps} />;
    default:
      return null;
  }
};

export default function Home() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [start, setStart] = useState(0);
  const [limit] = useState(10);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const fullText = PORTFOLIO_DATA.hero.title;
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        // Typing
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.substring(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(type, 100); // Typing speed
        } else {
          // Pause at the end for 2 seconds
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(fullText.substring(0, currentIndex));
          timeoutId = setTimeout(type, 50); // Deleting speed (faster)
        } else {
          // Start typing again
          isDeleting = false;
          timeoutId = setTimeout(type, 500); // Pause before retyping
        }
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const loadPublications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublications(
          start,
          limit,
          PORTFOLIO_DATA.personal.scholarId,
          PORTFOLIO_DATA.personal.serpApiKey
        );
        setPublications(data.publications);
        setHasNext(data.hasNext);
        setHasPrev(data.hasPrev);

        // Scroll to publications section after data is loaded (only if not initial load)
        if (start > 0 || hasPrev || hasNext) {
          setTimeout(() => {
            const publicationsSection = document.getElementById("publications");
            if (publicationsSection) {
              publicationsSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }, 100);
        }
      } catch (error: any) {
        console.error("Failed to load publications:", error);
        setError(error.message || "Failed to load publications");
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, [start, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      const shouldShow = scrollTop > 200;
      setShowTopButton(shouldShow);
      // Debug log - remove this later
      console.log("Scroll position:", scrollTop, "Show button:", shouldShow);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-[#13181d] bg-pattern-dots relative overflow-hidden">
      {/* Background Shapes - Only Top Area (Hero + About Sections) */}
      <div className="absolute top-0 left-0 w-full h-[200vh] z-0 pointer-events-none overflow-hidden">
        {/* Extra Large Circles - Top Area Only */}
        <div className="absolute -top-64 -right-64 w-[600px] h-[600px] rounded-full bg-[rgba(15,20,25,0.3)] animate-float-slow"></div>
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[rgba(10,15,20,0.25)] animate-float-medium"></div>
        <div className="absolute top-20 -left-48 w-[400px] h-[400px] rounded-full bg-[rgba(15,20,25,0.35)] animate-float-fast"></div>

        {/* Hero Section Circles */}
        <div className="absolute top-32 right-1/5 w-80 h-80 rounded-full bg-[rgba(10,15,20,0.3)] animate-float-medium"></div>
        <div className="absolute top-64 left-1/3 w-96 h-96 rounded-full bg-[rgba(15,20,25,0.25)] animate-float-slow"></div>
        <div className="absolute top-48 -right-32 w-[450px] h-[450px] rounded-full bg-[rgba(10,15,20,0.28)] animate-float-fast"></div>

        {/* About Section Area Circles */}
        <div className="absolute top-[120vh] left-2/3 w-64 h-64 rounded-full bg-[rgba(15,20,25,0.2)] animate-float-medium"></div>
        <div className="absolute top-[140vh] right-1/4 w-72 h-72 rounded-full bg-[rgba(10,15,20,0.22)] animate-float-slow"></div>
        <div className="absolute top-[160vh] left-1/6 w-80 h-80 rounded-full bg-[rgba(15,20,25,0.3)] animate-float-fast"></div>
        <div className="absolute top-[110vh] left-1/2 w-56 h-56 rounded-full bg-[rgba(10,15,20,0.25)] animate-float-medium"></div>

        {/* Additional Hero Area Circles */}
        <div className="absolute top-16 right-2/3 w-64 h-64 rounded-full bg-[rgba(15,20,25,0.28)] animate-float-slow"></div>
        <div className="absolute top-80 left-1/5 w-48 h-48 rounded-full bg-[rgba(10,15,20,0.2)] animate-float-medium"></div>

        {/* Large Background Circle - Hero Area */}
        <div className="absolute top-[50vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[rgba(15,20,25,0.15)] animate-float-slow"></div>
      </div>

      {/* Top Wave SVG */}
      <div className="absolute top-0 left-0 w-full h-64 z-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(15, 20, 25, 0.6)"
          />
          <path
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,117.3C960,128,1056,128,1152,106.7C1248,85,1344,43,1392,21.3L1440,0L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(10, 15, 20, 0.4)"
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#13181d]/95 backdrop-blur-md border-b border-gray-700 shadow-lg py-2"
            : "bg-[#13181d]/80 backdrop-blur-sm border-b border-transparent py-4"
        }`}
      >
        <div className="portfolio-container">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className={`text-white font-bold transition-all duration-300 cursor-pointer ${
                isScrolled ? "text-sm" : "text-base"
              }`}
            >
              {PORTFOLIO_DATA.personal.name}
            </Link>
            <div className="flex space-x-6 ml-12">
              {PORTFOLIO_DATA.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link transition-all duration-300 cursor-pointer ${
                    isScrolled ? "text-xs" : "text-xs"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 z-20">
        <div className="portfolio-container">
          <div className="flex items-center space-x-16">
            <div className="flex-shrink-0">
              <div className="profile-image bg-gray-600 overflow-hidden flex items-center justify-center relative">
                {mounted ? (
                  showImage ? (
                    <img
                      src="/avatar.jpg"
                      alt={`${PORTFOLIO_DATA.personal.name} - Profile Picture`}
                      className="w-full h-full object-cover"
                      onError={() => setShowImage(false)}
                    />
                  ) : (
                    <div className="text-white text-6xl font-light">
                      {PORTFOLIO_DATA.personal.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )
                ) : (
                  <div className="text-white text-6xl font-light">
                    {PORTFOLIO_DATA.personal.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="hero-title">
                {typedText}
                <span className={showCursor ? "opacity-100" : "opacity-0"}>
                  |
                </span>
              </h1>
              <p className="hero-subtitle">{PORTFOLIO_DATA.hero.subtitle}</p>
              <p className="hero-description">
                {PORTFOLIO_DATA.hero.description}
              </p>
            </div>
          </div>

          {/* Scroll Down Button */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => {
                const aboutSection = document.getElementById("about");
                aboutSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="animate-bounce p-2 rounded-full transition-colors cursor-pointer hover:bg-[rgb(49,132,128)]/20"
            >
              <ChevronDown
                size={24}
                className="text-gray-400 hover:text-[rgb(49,132,128)] transition-colors"
              />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">{PORTFOLIO_DATA.about.title}</h2>
          <div className="grid grid-cols-2 gap-12">
            {PORTFOLIO_DATA.about.paragraphs.map((paragraph, index) => (
              <div key={index}>
                <p className="hero-description">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Focus Section */}
      <section id="research" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.researchFocus?.title || "RESEARCH FOCUS"}
          </h2>
          <p className="hero-description mb-6">
            {PORTFOLIO_DATA.researchFocus?.description || ""}
          </p>
          <p className="hero-description mb-8">
            {PORTFOLIO_DATA.researchFocus?.ethicalNote || ""}
          </p>

          <div className="space-y-4 mb-8">
            {PORTFOLIO_DATA.researchFocus?.openSourceProjects?.map(
              (project, index) => (
                <div
                  key={index}
                  className="border-l-2 border-[rgb(49,132,128)] pl-4"
                >
                  <h3 className="project-title text-sm">{project.title}</h3>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href={project.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm cursor-pointer"
                    >
                      DOI
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm cursor-pointer"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              )
            ) || []}
          </div>

          <p className="hero-description">
            {PORTFOLIO_DATA.researchFocus?.additionalInfo || ""}
          </p>
        </div>
      </section>

      {/* Current Teaching Section */}
      <section id="teaching" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.currentTeaching?.title || "CURRENT TEACHING"}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="expertise-category">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.summer?.title ||
                  "Summer:"}
              </h3>
              <ul className="space-y-2">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.summer?.courses?.map(
                  (course, index) => (
                    <li key={index} className="expertise-skills">
                      – {course}
                    </li>
                  )
                ) || []}
              </ul>
            </div>

            <div>
              <h3 className="expertise-category">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.winter?.title ||
                  "Winter:"}
              </h3>
              <ul className="space-y-2">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.winter?.courses?.map(
                  (course, index) => (
                    <li key={index} className="expertise-skills">
                      – {course}
                    </li>
                  )
                ) || []}
              </ul>
            </div>

            <div>
              <h3 className="expertise-category">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.everySemester
                  ?.title || "Every Semester:"}
              </h3>
              <ul className="space-y-2">
                {PORTFOLIO_DATA.currentTeaching?.semesters?.everySemester?.courses?.map(
                  (course, index) => (
                    <li key={index} className="expertise-skills">
                      –{" "}
                      {typeof course === "string" ? (
                        course
                      ) : (
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer"
                        >
                          {course.text}
                        </a>
                      )}
                    </li>
                  )
                ) || []}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.publications?.title || "PUBLICATIONS"}
          </h2>
          <p className="hero-description mb-8">
            {PORTFOLIO_DATA.publications?.description || ""}
          </p>

          {loading ? (
            <div className="text-center py-8">
              <p className="hero-description">Loading publications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">Error loading publications</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                {publications.map((publication, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="project-title">{publication.title}</h3>
                        <p className="employment-role mb-2">
                          {publication.authors}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-400">
                            {publication.venue}
                          </span>
                          <span className="text-sm text-gray-400">
                            Citations: {publication.citations}
                          </span>
                          {publication.url && (
                            <a
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm cursor-pointer"
                            >
                              View Paper
                            </a>
                          )}
                        </div>
                      </div>
                      <span className="project-year">{publication.year}</span>
                    </div>
                    {index < publications.length - 1 && (
                      <div className="divider"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {(hasNext || hasPrev) && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setStart((prev) => Math.max(0, prev - limit))
                          }
                          className={
                            !hasPrev
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <span className="text-gray-400 px-4">
                          Showing {start + 1} - {start + publications.length}
                        </span>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setStart((prev) => prev + limit)}
                          className={
                            !hasNext
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.awards?.title || "AWARDS"}
          </h2>

          <div className="space-y-4">
            {PORTFOLIO_DATA.awards?.items?.map((award, index) => (
              <div
                key={index}
                className="border-l-2 border-[rgb(49,132,128)] pl-4"
              >
                <p className="expertise-skills">– {award}</p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Academic Functions & Activities Section */}
      <section id="academic" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.academicFunctions?.title ||
              "ACADEMIC FUNCTIONS & ACTIVITIES"}
          </h2>

          <div className="space-y-4">
            {PORTFOLIO_DATA.academicFunctions?.items?.map((activity, index) => (
              <div
                key={index}
                className="border-l-2 border-[rgb(49,132,128)] pl-4"
              >
                <p className="expertise-skills">– {activity}</p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing relative z-20">
        <div className="portfolio-container">
          <h2 className="section-title">
            {PORTFOLIO_DATA.contact?.title || "CONTACT"}
          </h2>
          <p className="hero-description mb-8">
            {PORTFOLIO_DATA.contact?.description || ""}
          </p>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h3 className="contact-label">GROUP</h3>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.group || ""}
              </p>

              <h3 className="contact-label mt-6">OFFICE HOURS</h3>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.officeHours || ""}
              </p>

              <h3 className="contact-label mt-6">ROOM</h3>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.room || ""}
              </p>

              <h3 className="contact-label mt-6">PHONE</h3>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.phone || ""}
              </p>

              <h3 className="contact-label mt-6">EMAIL</h3>
              <a
                href={`mailto:${PORTFOLIO_DATA.contact?.office?.email || ""}`}
                className="contact-info"
              >
                {PORTFOLIO_DATA.contact?.office?.email || ""}
              </a>
            </div>
            <div>
              <h3 className="contact-label">INSTITUTION</h3>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.institution || ""}
              </p>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.faculty || ""}
              </p>
              <p className="contact-info">
                {PORTFOLIO_DATA.contact?.office?.institute || ""}
              </p>
              <p className="contact-info mt-4">
                {PORTFOLIO_DATA.contact?.office?.address || ""}
              </p>

              {/* Social Media Icons */}
              <div className="mt-8">
                <h3 className="contact-label mb-4">CONNECT</h3>
                <div className="flex space-x-4">
                  {PORTFOLIO_DATA.contact?.social?.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full border border-gray-600 hover:border-[rgb(49,132,128)] hover:bg-[rgb(49,132,128)]/20 transition-all duration-300"
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  )) || []}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full h-64 z-5 rotate-180">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(15, 20, 25, 0.4)"
          />
        </svg>
      </div>

      {/* Fixed Back to Top Button */}
      <Button
        variant="outline"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 p-3 border-gray-600 text-gray-400 hover:text-white hover:border-[rgb(49,132,128)] hover:bg-[rgb(49,132,128)]/20 bg-[#13181d]/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ${
          showTopButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
}
