"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  Database,
  Smartphone,
  Globe,
  Server,
  Zap,
  ChevronDown,
  Send,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Phone,
  MapPin,
  Menu,
  X,
  Clock,
  MessageCircle,
  ArrowUpRight,
  Download,
  ExternalLink,
} from "lucide-react"

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [currentService, setCurrentService] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoSliding, setIsAutoSliding] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Enhanced mouse effect refs
  const mouseRef = useRef<HTMLDivElement>(null)
  const trailParticles = useRef<Array<{ x: number; y: number; life: number; id: number; vx: number; vy: number }>>([])
  const particleId = useRef(0)
  const mousePosition = useRef({ x: 0, y: 0 })

  // GSAP refs
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Shared GSAP ref – gets set once and re-used everywhere
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null)

  // Portfolio data state
  const [portfolioData] = useState({
    name: "Avishka Priyasoma",
    title: "Software Engineer & Full-Stack Developer",
    bio: "I craft digital experiences that blend beautiful design with powerful functionality. Specializing in modern web and mobile development with cutting-edge technologies.",
    about:
      "I'm a passionate full-stack developer from Sri Lanka with expertise in creating scalable, user-centric applications. My approach combines technical excellence with thoughtful design to deliver solutions that truly make a difference in the digital landscape.",
    email: "avishkapriyasoma@gmail.com",
    phone: "+94 74 1387 807",
    location: "Colombo, Sri Lanka",
  })

  // Enhanced GSAP Scroll Effects (Angular.dev style)
  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      // core + always-available plugins
      const [gsapMod, STMod, STPMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollToPlugin"),
      ])

      const gsap = gsapMod.default
      const { ScrollTrigger } = STMod
      const { ScrollToPlugin } = STPMod

      // try to load the optional ScrollSmoother plugin
      let ScrollSmoother: any = null
      try {
        ScrollSmoother = (await import("gsap/ScrollSmoother")).ScrollSmoother
      } catch (err) {
        console.warn("[portfolio] ScrollSmoother not found – falling back to CSS smooth-scroll.", err)
      }

      // register everything we successfully imported
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ...(ScrollSmoother ? [ScrollSmoother] : []))
      gsapRef.current = gsap

      // ------------------------------------------------------------------
      // Smooth scrolling initialisation
      // ------------------------------------------------------------------
      if (ScrollSmoother) {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2.5,
          effects: true,
          smoothTouch: 0.2,
          normalizeScroll: true,
          ignoreMobileResize: true,
        })
      } else {
        // native fallback: ensure a pleasant baseline experience
        document.documentElement.style.scrollBehavior = "smooth"
      }

      // Hero animations with stagger effect
      if (heroRef.current) {
        const tl = gsap.timeline()

        tl.fromTo(
          heroRef.current.querySelector(".hero-badge"),
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        )
          .fromTo(
            heroRef.current.querySelector(".hero-title"),
            { y: 80, opacity: 0, rotationX: 45 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "power3.out" },
            "-=0.6",
          )
          .fromTo(
            heroRef.current.querySelector(".hero-subtitle"),
            { y: 50, opacity: 0, x: -30 },
            { y: 0, opacity: 1, x: 0, duration: 1, ease: "power2.out" },
            "-=0.8",
          )
          .fromTo(
            heroRef.current.querySelector(".hero-description"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.6",
          )
          .fromTo(
            heroRef.current.querySelectorAll(".hero-button"),
            { y: 30, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
            "-=0.4",
          )

        // Parallax background elements
        gsap.to(heroRef.current.querySelector(".hero-bg-1"), {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })

        gsap.to(heroRef.current.querySelector(".hero-bg-2"), {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      }

      // Section animations with Angular.dev style reveals
      const sections = [aboutRef, servicesRef, projectsRef, skillsRef, contactRef]
      sections.forEach((ref, index) => {
        if (ref.current) {
          // Title animations
          gsap.fromTo(
            ref.current.querySelector(".section-title"),
            { y: 100, opacity: 0, rotationX: 45 },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                end: "bottom 15%",
              },
            },
          )

          // Content animations with stagger
          gsap.fromTo(
            ref.current.querySelectorAll(".animate-in"),
            { y: 80, opacity: 0, rotationX: 30 },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 1,
              stagger: {
                amount: 0.8,
                from: "start",
              },
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                end: "bottom 20%",
              },
            },
          )

          // Card hover animations
          const cards = ref.current.querySelectorAll(".hover-card")
          cards.forEach((card) => {
            const cardElement = card as HTMLElement
            cardElement.addEventListener("mouseenter", () => {
              if (gsapRef.current) {
                gsapRef.current.to(card, {
                  y: -10,
                  scale: 1.02,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
            })
            cardElement.addEventListener("mouseleave", () => {
              if (gsapRef.current) {
                gsapRef.current.to(card, {
                  y: 0,
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                })
              }
            })
          })
        }
      })

      // Smooth scroll for navigation with momentum
      const navButtons = document.querySelectorAll("[data-scroll-to]")
      navButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault()
          const target = (e.target as HTMLElement).getAttribute("data-scroll-to")
          if (target) {
            gsap.to(window, {
              duration: 2.5,
              scrollTo: { y: target, offsetY: 80 },
              ease: "power2.inOut",
            })
          }
        })
      })
    })()
  }, [isLoading])

  // Enhanced mouse trail effect with dark theme
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      if (Math.random() < 0.4) {
        const particle = {
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          life: 1,
          id: particleId.current++,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        }
        trailParticles.current.push(particle)
      }

      if (mouseRef.current) {
        if (gsapRef.current) {
          gsapRef.current.to(mouseRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out",
          })
        } else {
          mouseRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        }
      }
    }

    const animateParticles = () => {
      trailParticles.current = trailParticles.current.filter((particle) => {
        particle.life -= 0.018
        particle.y += particle.vy
        particle.x += particle.vx
        particle.vy += 0.08
        particle.vx *= 0.98
        return particle.life > 0
      })

      if (trailParticles.current.length > 40) {
        trailParticles.current = trailParticles.current.slice(-40)
      }

      requestAnimationFrame(animateParticles)
    }

    document.addEventListener("mousemove", handleMouseMove)
    animateParticles()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoSliding) {
      interval = setInterval(() => {
        setCurrentService((prev) => (prev + 1) % services.length)
      }, 6000)
    }
    return () => clearInterval(interval)
  }, [isAutoSliding])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return
    if (gsapRef.current) {
      gsapRef.current.to(window, {
        duration: 2,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.inOut",
      })
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setMobileMenuOpen(false)
  }

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 10000)
  }

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 10000)
  }

  const goToService = (index: number) => {
    setCurrentService(index)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 10000)
  }

  const projects = [
    {
      title: "LUV Sri Lanka",
      description: "Modern tourism platform with seamless booking experience and comprehensive admin dashboard",
      tech: ["Next.js", "Firebase", "Stripe"],
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      status: "Live",
      year: "2024",
      link: "#",
    },
    {
      title: "Employee Management Suite",
      description: "Advanced workforce management with GPS tracking, task automation, and real-time analytics",
      tech: ["Flutter", "Google Maps", "Firebase"],
      icon: <Smartphone className="w-5 h-5" />,
      gradient: "from-green-500 via-emerald-600 to-teal-500",
      status: "In Development",
      year: "2024",
      link: "#",
    },
    {
      title: "Healthcare Management System",
      description: "Multi-vendor hospital platform with dynamic database architecture and patient portal",
      tech: ["Flutter", "Firebase", "Node.js"],
      icon: <Database className="w-5 h-5" />,
      gradient: "from-purple-500 via-violet-600 to-purple-700",
      status: "Live",
      year: "2023",
      link: "#",
    },
    {
      title: "Digital Clinic Platform",
      description: "Comprehensive patient management system with appointment scheduling and medical records",
      tech: ["Flutter", "Firebase", "WebRTC"],
      icon: <Monitor className="w-5 h-5" />,
      gradient: "from-red-500 via-pink-600 to-rose-500",
      status: "Live",
      year: "2023",
      link: "#",
    },
    {
      title: "Community Blog Network",
      description: "Interactive spiritual community platform with mentoring and content management features",
      tech: ["Laravel", "MySQL", "Vue.js"],
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-indigo-500 via-purple-600 to-pink-500",
      status: "Live",
      year: "2023",
      link: "#",
    },
    {
      title: "Smart Garden Defense",
      description: "IoT-powered agricultural protection system with AI-driven threat detection",
      tech: ["Arduino", "IoT", "Python"],
      icon: <Zap className="w-5 h-5" />,
      gradient: "from-yellow-500 via-orange-600 to-red-500",
      status: "Prototype",
      year: "2022",
      link: "#",
    },
  ]

  const skills = [
    { name: "React", icon: <Code2 className="w-6 h-6" />, level: 95, color: "from-cyan-400 to-blue-500" },
    { name: "Next.js", icon: <Globe className="w-6 h-6" />, level: 90, color: "from-gray-400 to-gray-600" },
    { name: "Flutter", icon: <Smartphone className="w-6 h-6" />, level: 88, color: "from-blue-400 to-cyan-500" },
    { name: "Node.js", icon: <Server className="w-6 h-6" />, level: 85, color: "from-green-400 to-emerald-500" },
    { name: "Firebase", icon: <Database className="w-6 h-6" />, level: 92, color: "from-orange-400 to-red-500" },
    { name: "Laravel", icon: <Code2 className="w-6 h-6" />, level: 80, color: "from-red-400 to-pink-500" },
    { name: "TypeScript", icon: <Code2 className="w-6 h-6" />, level: 87, color: "from-blue-400 to-indigo-500" },
    { name: "Supabase", icon: <Database className="w-6 h-6" />, level: 85, color: "from-green-400 to-teal-500" },
  ]

  const services = [
    {
      title: "Web Development",
      description:
        "Creating modern, responsive web applications with cutting-edge technologies. From concept to deployment, I deliver scalable solutions that drive business growth and user engagement.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Implementation",
        "Modern UI/UX",
        "E-commerce Solutions",
        "CMS Development",
      ],
      icon: <Monitor className="w-8 h-8" />,
      gradient: "from-blue-500 via-purple-600 to-cyan-500",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
      price: "Starting at $2,500",
    },
    {
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications that deliver native performance. Your app will work flawlessly on both iOS and Android platforms with a single codebase.",
      features: [
        "Cross-Platform",
        "Native Performance",
        "Real-time Features",
        "Cloud Integration",
        "Push Notifications",
        "Offline Support",
      ],
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-green-500 via-emerald-600 to-teal-500",
      technologies: ["Flutter", "Dart", "Firebase", "SQLite", "REST APIs", "GraphQL"],
      price: "Starting at $3,500",
    },
  ]

  // Preloader Component
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-purple-500 rounded-full animate-spin mx-auto opacity-60"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Loading Portfolio
            </h1>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="smooth-wrapper" className="min-h-screen">
      <div
        id="smooth-content"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden"
      >
        {/* Enhanced Custom Cursor */}
        <div
          ref={mouseRef}
          className="fixed w-6 h-6 pointer-events-none z-50 rounded-full border-2 border-blue-400 mix-blend-difference hidden lg:block"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Enhanced Trail Particles */}
        {trailParticles.current.map((particle) => (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-40 rounded-full hidden lg:block"
            style={{
              left: particle.x + "px",
              top: particle.y + "px",
              width: `${3 + particle.life * 6}px`,
              height: `${3 + particle.life * 6}px`,
              background: `radial-gradient(circle, 
                rgba(59, 130, 246, ${particle.life * 0.8}) 0%, 
                rgba(139, 92, 246, ${particle.life * 0.6}) 40%, 
                rgba(6, 182, 212, ${particle.life * 0.4}) 70%, 
                transparent 100%)`,
              transform: `translate(-50%, -50%) scale(${particle.life})`,
              filter: `blur(${(1 - particle.life) * 1}px)`,
            }}
          />
        ))}

        {/* Modern Dark Navigation */}
        <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-xl z-40 border-b border-gray-800/50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {portfolioData.name}
                  </h1>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                >
                  Services
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium relative group"
                >
                  Work
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Contact
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-800">
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-300 hover:text-white transition-colors text-left py-2 text-sm font-medium"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-300 hover:text-white transition-colors text-left py-2 text-sm font-medium"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-gray-300 hover:text-white transition-colors text-left py-2 text-sm font-medium"
                  >
                    Work
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-300 hover:text-white transition-colors text-left py-2 text-sm font-medium"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center relative pt-16 px-6 lg:px-8 overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="hero-bg-1 absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="hero-bg-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-full blur-3xl animate-float-delayed"></div>

          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="hero-badge inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-300 rounded-full text-sm font-medium mb-8 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse shadow-lg shadow-green-400/50"></div>
              Available for new projects
            </div>

            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {portfolioData.name}
              </span>
            </h1>

            <h2 className="hero-subtitle text-xl md:text-3xl text-gray-300 mb-8 font-medium">{portfolioData.title}</h2>

            <p className="hero-description text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {portfolioData.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="hero-button bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 text-lg"
              >
                View My Work
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="hero-button border-2 border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10 px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-sm text-lg"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          id="about"
          className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-gray-800/50"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    About Me
                  </span>
                </h2>
                <div className="animate-in space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">{portfolioData.about}</p>
                  <p>
                    With years of experience in the industry, I've had the privilege of working with startups and
                    established companies, helping them bring their digital visions to life through clean code and
                    thoughtful design.
                  </p>
                </div>
                <div className="animate-in mt-8">
                  <Button
                    variant="outline"
                    className="group border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10"
                  >
                    Download Resume
                    <Download className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="animate-in">
                <div className="grid grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="hover-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`text-transparent bg-gradient-to-r ${skill.color} bg-clip-text`}>
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-400">{skill.level}%</span>
                      </div>
                      <h3 className="font-semibold text-white mb-3">{skill.name}</h3>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 shadow-sm`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} id="services" className="py-24 px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="animate-in text-xl text-gray-300 max-w-3xl mx-auto">
                I offer comprehensive digital solutions tailored to your business needs
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentService * 100}%)` }}
                >
                  {services.map((service, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                          <div>
                            <div
                              className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} mb-6 shadow-lg`}
                            >
                              <div className="text-white">{service.icon}</div>
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">{service.title}</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed text-lg">{service.description}</p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                              {service.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center space-x-3">
                                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                                  <span className="text-gray-300 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-8">
                              {service.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium border border-gray-600/50"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                {service.price}
                              </span>
                              <Button
                                onClick={() => scrollToSection("contact")}
                                className={`bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300`}
                              >
                                Get Started
                              </Button>
                            </div>
                          </div>
                          <div className="relative">
                            <div
                              className={`aspect-square bg-gradient-to-br ${service.gradient} opacity-20 rounded-3xl blur-3xl`}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-3xl backdrop-blur-sm border border-gray-700/30"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevService}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-4 rounded-full shadow-lg border border-gray-700/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextService}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700/80 text-white p-4 rounded-full shadow-lg border border-gray-700/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex justify-center mt-8 space-x-3">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToService(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentService
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 w-8"
                        : "bg-gray-600 w-2 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          id="projects"
          className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-800/50 to-gray-900/50"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured Work
                </span>
              </h2>
              <p className="animate-in text-xl text-gray-300 max-w-3xl mx-auto">
                A selection of projects that showcase my expertise and passion for creating exceptional digital
                experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="animate-in hover-card bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group"
                >
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${project.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <div className="text-white">{project.icon}</div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Live"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : project.status === "In Development"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                          }`}
                        >
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-400 transition-colors text-xl mb-3">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-md text-xs font-medium border border-gray-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:border-blue-400 hover:text-white hover:bg-blue-500/10 group"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="py-24 px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Let's Work Together
                </span>
              </h2>
              <p className="animate-in text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create
                something amazing together.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div className="animate-in">
                <h3 className="text-2xl font-bold text-white mb-8">Get in touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <a
                        href={`mailto:${portfolioData.email}`}
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        {portfolioData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <a
                        href={`tel:${portfolioData.phone}`}
                        className="text-gray-300 hover:text-green-400 transition-colors"
                      >
                        {portfolioData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-gray-300">{portfolioData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-colors backdrop-blur-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Response Time</h4>
                      <p className="text-gray-300">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-white mb-4">Follow me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-800/80 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href={`mailto:${portfolioData.email}`}
                      className="w-12 h-12 bg-gray-800/80 hover:bg-green-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-in">
                <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700/50 shadow-2xl rounded-2xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-white text-2xl flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3 text-blue-400" />
                      Send a message
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] backdrop-blur-sm"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Dark Footer */}
        <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 border-t border-gray-800">
          <div className="container mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {portfolioData.name}
                  </h3>
                </div>
                <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                  Full-Stack Developer creating exceptional digital experiences through clean code and thoughtful
                  design. Let's build something amazing together.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 hover:bg-blue-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="w-12 h-12 bg-gray-800/80 hover:bg-green-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700/50"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      About
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Services
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("projects")}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Work
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Contact
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-6">Contact</h4>
                <div className="space-y-3">
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors block"
                  >
                    {portfolioData.email}
                  </a>
                  <a
                    href={`tel:${portfolioData.phone}`}
                    className="text-gray-400 hover:text-green-400 transition-colors block"
                  >
                    {portfolioData.phone}
                  </a>
                  <p className="text-gray-400">{portfolioData.location}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">© 2024 {portfolioData.name}. All rights reserved.</div>
              <div className="text-gray-500 text-sm">Crafted with precision and passion ✨</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
