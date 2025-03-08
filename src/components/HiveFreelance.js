import React, { useState, useEffect } from "react";

const HiveFreelance = () => {
    const sampleJobs = [
        {
            title: "Blockchain dApp Developer Needed",
            description: "Looking for an experienced blockchain developer to create a decentralized application (dApp) on the Hive blockchain. Must have experience with React, JavaScript, and smart contracts. The project involves creating a social media-like platform with token integration.",
            budget: "2000 HBD",
            freelancerEarnings: "1900 HBD",
            employer: "cryptodev",
            timestamp: "2024-03-20T10:30:00Z",
            skills: ["React", "JavaScript", "Smart Contracts", "Blockchain"],
            duration: "3 months",
            experience: "3+ years"
        },
        {
            title: "UI/UX Designer for Hive Platform",
            description: "Seeking a talented UI/UX designer to redesign our Hive-based content platform. The ideal candidate should have experience in designing blockchain applications and understanding of Web3 interfaces. Knowledge of Figma and Adobe Creative Suite is required.",
            budget: "1500 HBD",
            freelancerEarnings: "1425 HBD",
            employer: "hivedesign",
            timestamp: "2024-03-19T15:45:00Z",
            skills: ["UI/UX", "Figma", "Web3", "Adobe XD"],
            duration: "2 months",
            experience: "2+ years"
        },
        {
            title: "Content Writer for Crypto Blog",
            description: "Looking for a skilled content writer with deep knowledge of cryptocurrency and blockchain technology. Will be responsible for creating engaging blog posts, tutorials, and documentation for our Hive-based platform.",
            budget: "800 HBD",
            freelancerEarnings: "760 HBD",
            employer: "cryptoblogger",
            timestamp: "2024-03-18T09:15:00Z",
            skills: ["Content Writing", "Crypto", "SEO", "Technical Writing"],
            duration: "Ongoing",
            experience: "1+ years"
        },
        {
            title: "Smart Contract Auditor",
            description: "Need an experienced smart contract auditor to review and secure our Hive-based DeFi application. Must have a strong background in blockchain security and previous experience in smart contract auditing.",
            budget: "3000 HBD",
            freelancerEarnings: "2850 HBD",
            employer: "defiprotocol",
            timestamp: "2024-03-17T14:20:00Z",
            skills: ["Smart Contracts", "Security", "Auditing", "DeFi"],
            duration: "1 month",
            experience: "5+ years"
        }
    ];

    const [jobs, setJobs] = useState([...sampleJobs]);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [hiveUser, setHiveUser] = useState("");
    const [skills, setSkills] = useState("");
    const [duration, setDuration] = useState("");
    const [experience, setExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const commissionRate = 0.05; // 5% commission

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                "https://api.hive.blog",
                {
                    method: "POST",
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        method: "condenser_api.get_account_history",
                        params: ["hive_username", -1, 100],
                        id: 1,
                    }),
                }
            );

            const data = await response.json();
            const fetchedJobs = data.result
                ?.filter((item) => item[1].op[0] === "custom_json")
                .map((item) => JSON.parse(item[1].op[1].json)) || [];

            // Combine fetched jobs with sample jobs, avoiding duplicates
            const allJobs = [...sampleJobs];
            fetchedJobs.forEach(fetchedJob => {
                if (!allJobs.some(job => job.timestamp === fetchedJob.timestamp)) {
                    allJobs.push(fetchedJob);
                }
            });

            // Sort jobs by timestamp, most recent first
            allJobs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            setJobs(allJobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError("Failed to fetch jobs. Please try again later.");
            // Keep showing sample jobs even if fetch fails
            setJobs([...sampleJobs]);
        } finally {
            setLoading(false);
        }
    };

    const postJob = () => {
        if (!hiveUser) {
            alert("Please enter your Hive username.");
            return;
        }

        if (!jobTitle || !jobDescription || !budget || !skills || !duration || !experience) {
            alert("Please fill in all fields.");
            return;
        }

        const freelancerPayout = (budget - budget * commissionRate).toFixed(2);

        const jobData = {
            title: jobTitle,
            description: jobDescription,
            budget: `${budget} HBD`,
            freelancerEarnings: `${freelancerPayout} HBD`,
            employer: hiveUser,
            timestamp: new Date().toISOString(),
            skills: skills.split(',').map(skill => skill.trim()),
            duration: duration,
            experience: experience
        };

        window.hive_keychain.requestCustomJson(
            hiveUser,
            "hive_freelance_jobs",
            "Posting a freelance job",
            JSON.stringify(jobData),
            "posting",
            (response) => {
                if (response.success) {
                    alert("Job posted successfully!");
                    setJobs(prevJobs => [jobData, ...prevJobs]);
                    // Clear all form fields
                    setJobTitle("");
                    setJobDescription("");
                    setBudget("");
                    setSkills("");
                    setDuration("");
                    setExperience("");
                } else {
                    alert("Failed to post job: " + response.message);
                }
            }
        );
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Add new sample profiles data
    const sampleProfiles = [
        {
            username: "cryptodev123",
            name: "Alex Thompson",
            title: "Blockchain Developer & Smart Contract Specialist",
            description: "Experienced blockchain developer with 5+ years of experience in DeFi and NFT projects. Specialized in Hive blockchain development and smart contract implementation.",
            skills: ["Solidity", "React", "Node.js", "Smart Contracts", "DeFi"],
            hourlyRate: "50 HBD",
            availability: "Full-time",
            experience: "5+ years",
            completedProjects: 34,
            rating: 4.9,
            portfolio: [
                {
                    title: "DeFi Exchange Platform",
                    description: "Built a decentralized exchange with automated market maker",
                },
                {
                    title: "NFT Marketplace",
                    description: "Developed a full-stack NFT marketplace on Hive",
                }
            ],
            contact: "https://discord.com/cryptodev123"
        },
        {
            username: "designpro",
            name: "Sarah Chen",
            title: "UI/UX Designer & Web3 Specialist",
            description: "Creative designer with a passion for blockchain and Web3 interfaces. Experienced in creating intuitive and beautiful experiences for DApps and crypto platforms.",
            skills: ["UI/UX", "Figma", "Web3 Design", "Branding", "Motion Design"],
            hourlyRate: "45 HBD",
            availability: "Part-time",
            experience: "4+ years",
            completedProjects: 28,
            rating: 4.8,
            portfolio: [
                {
                    title: "Crypto Wallet Interface",
                    description: "Designed a user-friendly crypto wallet interface",
                },
                {
                    title: "DeFi Dashboard",
                    description: "Created an intuitive DeFi platform dashboard",
                }
            ],
            contact: "https://discord.com/designpro"
        }
    ];

    // Add new state variables
    const [profiles, setProfiles] = useState([...sampleProfiles]);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [profileData, setProfileData] = useState({
        username: "",
        name: "",
        title: "",
        description: "",
        skills: "",
        hourlyRate: "",
        availability: "",
        experience: "",
        portfolio: [],
        contact: ""
    });

    // Add new state for reputation
    const [reputations, setReputations] = useState({});

    // Add reputation fetching function
    const fetchReputation = async (username) => {
        try {
            const response = await fetch(
                "https://api.hive.blog",
                {
                    method: "POST",
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        method: "reputation_api.get_account_reputations",
                        params: {
                            account_lower_bound: username,
                            limit: 1
                        },
                        id: 1
                    }),
                }
            );

            const data = await response.json();
            if (data.result && data.result.length > 0) {
                const rep = data.result[0].reputation;
                // Convert raw reputation score to human readable format (similar to what Hive shows)
                const convertReputation = (raw) => {
                    if (raw === 0) return 25;
                    const neg = raw < 0;
                    const repLevel = Math.log10(Math.abs(raw));
                    let reputationLevel = Math.max(repLevel - 9, 0);
                    if (reputationLevel < 0) reputationLevel = 0;
                    if (neg) reputationLevel *= -1;
                    return (reputationLevel * 9 + 25).toFixed(1);
                };
                
                setReputations(prev => ({
                    ...prev,
                    [username]: convertReputation(rep)
                }));
            }
        } catch (error) {
            console.error("Error fetching reputation:", error);
        }
    };

    // Add useEffect to fetch reputations for sample profiles
    useEffect(() => {
        sampleProfiles.forEach(profile => {
            fetchReputation(profile.username);
        });
    }, []);

    // Add new styles
    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            color: '#fff',
        },
        marketplaceHeader: {
            textAlign: 'center',
            marginBottom: '3rem',
            background: 'linear-gradient(165deg, rgba(93, 47, 189, 0.1) 0%, rgba(93, 47, 189, 0.05) 100%)',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid rgba(93, 47, 189, 0.2)',
        },
        marketplaceTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
        },
        marketplaceSubtitle: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6',
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#fff',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        formSection: {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '3rem',
            border: '1px solid rgba(93, 47, 189, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: '#fff',
            fontSize: '0.9rem',
            transition: 'all 0.3s',
            '&:focus': {
                borderColor: '#5d2fbd',
                outline: 'none',
                backgroundColor: 'rgba(93, 47, 189, 0.1)',
            },
        },
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: '#fff',
            fontSize: '0.9rem',
            minHeight: '150px',
            resize: 'vertical',
        },
        button: {
            width: '100%',
            padding: '1rem',
            backgroundColor: '#5d2fbd',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
                backgroundColor: '#4d27a8',
                transform: 'translateY(-2px)',
            },
        },
        jobsList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
        },
        jobCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(93, 47, 189, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
                transform: 'translateY(-3px)',
                backgroundColor: 'rgba(93, 47, 189, 0.08)',
            },
        },
        jobTitle: {
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#fff',
        },
        jobDescription: {
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '1rem',
            lineHeight: '1.5',
        },
        jobMeta: {
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        budgetTag: {
            display: 'inline-block',
            padding: '0.4rem 0.8rem',
            backgroundColor: 'rgba(93, 47, 189, 0.2)',
            borderRadius: '0.4rem',
            fontSize: '0.8rem',
            color: '#fff',
            marginTop: '0.5rem',
        },
        skillTag: {
            display: 'inline-block',
            padding: '0.3rem 0.6rem',
            backgroundColor: 'rgba(93, 47, 189, 0.15)',
            borderRadius: '0.3rem',
            fontSize: '0.75rem',
            color: '#fff',
            margin: '0.25rem',
        },
        jobDetails: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            padding: '0.5rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.7)',
        },
        detailItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        skillsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
            marginTop: '0.75rem',
        },
        formGroup: {
            marginBottom: '1.5rem',
        },
        label: {
            display: 'block',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500',
        },
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '0.5rem',
            color: '#fff',
            fontSize: '0.9rem',
            transition: 'all 0.3s',
            '&:focus': {
                borderColor: '#5d2fbd',
                outline: 'none',
                backgroundColor: 'rgba(93, 47, 189, 0.1)',
            },
        },
        profilesSection: {
            marginTop: '4rem',
            marginBottom: '2rem',
        },
        profileCard: {
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(93, 47, 189, 0.2)',
            marginBottom: '1.5rem',
            transition: 'all 0.3s',
            '&:hover': {
                transform: 'translateY(-3px)',
                backgroundColor: 'rgba(93, 47, 189, 0.08)',
            }
        },
        profileHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '1.5rem',
        },
        profileAvatar: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #5d2fbd',
        },
        profileInfo: {
            flex: 1,
        },
        profileName: {
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '0.5rem',
            color: '#fff',
        },
        profileTitle: {
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '0.5rem',
        },
        profileStats: {
            display: 'flex',
            gap: '2rem',
            marginTop: '1rem',
            padding: '1rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        },
        statItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        statValue: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#5d2fbd',
        },
        statLabel: {
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.6)',
        },
        portfolioSection: {
            marginTop: '1.5rem',
        },
        portfolioItem: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
        },
        createProfileBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#5d2fbd',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'all 0.3s',
            '&:hover': {
                backgroundColor: '#4d27a8',
                transform: 'translateY(-2px)',
            },
        },
    };

    // Modify handleCreateProfile to fetch reputation
    const handleCreateProfile = () => {
        if (!profileData.username || !profileData.name || !profileData.title || !profileData.description) {
            alert("Please fill in all required fields");
            return;
        }

        // Fetch reputation for new profile
        fetchReputation(profileData.username);

        const newProfile = {
            ...profileData,
            skills: profileData.skills.split(',').map(skill => skill.trim()),
            completedProjects: 0,
            rating: 0,
            portfolio: []
        };

        setProfiles(prevProfiles => [newProfile, ...prevProfiles]);
        setShowProfileForm(false);
        setProfileData({
            username: "",
            name: "",
            title: "",
            description: "",
            skills: "",
            hourlyRate: "",
            availability: "",
            experience: "",
            portfolio: [],
            contact: ""
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.marketplaceHeader}>
                <h1 style={styles.marketplaceTitle}>Hive Freelance Marketplace</h1>
                <p style={styles.marketplaceSubtitle}>
                    Connect with talented freelancers and find exciting blockchain opportunities on the Hive network
                </p>
            </div>

            <h2 style={styles.sectionTitle}>🚀 Available Opportunities</h2>
            <div style={styles.jobsList}>
                {jobs.length === 0 ? (
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No opportunities available yet.</p>
                ) : (
                    jobs.map((job, index) => (
                        <div key={index} style={{
                            ...styles.jobCard,
                            background: index % 3 === 0 
                                ? 'linear-gradient(165deg, rgba(93, 47, 189, 0.08) 0%, rgba(93, 47, 189, 0.03) 100%)'
                                : index % 3 === 1
                                ? 'linear-gradient(165deg, rgba(51, 139, 234, 0.08) 0%, rgba(51, 139, 234, 0.03) 100%)'
                                : 'linear-gradient(165deg, rgba(234, 51, 119, 0.08) 0%, rgba(234, 51, 119, 0.03) 100%)'
                        }}>
                            <h4 style={styles.jobTitle}>{job.title}</h4>
                            <p style={styles.jobDescription}>{job.description}</p>
                            
                            <div style={styles.skillsContainer}>
                                {job.skills.map((skill, idx) => (
                                    <span key={idx} style={styles.skillTag}>{skill}</span>
                                ))}
                            </div>

                            <div style={styles.jobDetails}>
                                <span style={styles.detailItem}>
                                    🕒 Duration: {job.duration}
                                </span>
                                <span style={styles.detailItem}>
                                    💼 Experience: {job.experience}
                                </span>
                            </div>

                            <div style={styles.jobMeta}>
                                <span style={styles.budgetTag}>Budget: {job.budget}</span>
                                <span style={styles.budgetTag}>Earnings: {job.freelancerEarnings}</span>
                                <span>Posted by: {job.employer}</span>
                                <span>Posted: {new Date(job.timestamp).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Freelancer Profiles Section */}
            <div style={styles.profilesSection}>
                <h2 style={styles.sectionTitle}>👨‍💻 Available Freelancers</h2>
                
                <button 
                    style={styles.createProfileBtn}
                    onClick={() => setShowProfileForm(!showProfileForm)}
                >
                    {showProfileForm ? '✕ Cancel' : '+ Create Freelancer Profile'}
                </button>

                {showProfileForm && (
                    <div style={styles.formSection}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Hive Username *</label>
                            <input
                                type="text"
                                value={profileData.username}
                                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                                style={styles.input}
                                placeholder="Your Hive username"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Full Name *</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                style={styles.input}
                                placeholder="Your full name"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Professional Title *</label>
                            <input
                                type="text"
                                value={profileData.title}
                                onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                                style={styles.input}
                                placeholder="e.g., Senior Blockchain Developer"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description *</label>
                            <textarea
                                value={profileData.description}
                                onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                                style={styles.textarea}
                                placeholder="Describe your expertise and experience"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Skills (comma-separated)</label>
                            <input
                                type="text"
                                value={profileData.skills}
                                onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                                style={styles.input}
                                placeholder="e.g., React, Solidity, Smart Contracts"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Hourly Rate (HBD)</label>
                            <input
                                type="text"
                                value={profileData.hourlyRate}
                                onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                                style={styles.input}
                                placeholder="e.g., 50"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Availability</label>
                            <select
                                value={profileData.availability}
                                onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                                style={styles.select}
                            >
                                <option value="">Select availability</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Experience Level</label>
                            <select
                                value={profileData.experience}
                                onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                                style={styles.select}
                            >
                                <option value="">Select experience level</option>
                                <option value="Entry level">Entry level</option>
                                <option value="1+ years">1+ years</option>
                                <option value="2+ years">2+ years</option>
                                <option value="5+ years">5+ years</option>
                                <option value="7+ years">7+ years</option>
                            </select>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Contact Information</label>
                            <input
                                type="text"
                                value={profileData.contact}
                                onChange={(e) => setProfileData({...profileData, contact: e.target.value})}
                                style={styles.input}
                                placeholder="Discord username or other contact method"
                            />
                        </div>

                        <button onClick={handleCreateProfile} style={styles.button}>
                            Create Profile
                        </button>
                    </div>
                )}

                <div style={styles.jobsList}>
                    {profiles.map((profile, index) => (
                        <div key={index} style={styles.profileCard}>
                            <div style={styles.profileHeader}>
                                <img
                                    src={`https://images.hive.blog/u/${profile.username}/avatar`}
                                    alt={profile.name}
                                    style={styles.profileAvatar}
                                />
                                <div style={styles.profileInfo}>
                                    <h3 style={styles.profileName}>{profile.name}</h3>
                                    <p style={styles.profileTitle}>{profile.title}</p>
                                    <div style={styles.skillsContainer}>
                                        {profile.skills.map((skill, idx) => (
                                            <span key={idx} style={styles.skillTag}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p style={styles.jobDescription}>{profile.description}</p>

                            <div style={styles.profileStats}>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>{profile.hourlyRate}</span>
                                    <span style={styles.statLabel}>Hourly Rate</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>
                                        {reputations[profile.username] || '25.0'}
                                    </span>
                                    <span style={styles.statLabel}>Reputation</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>{profile.completedProjects}</span>
                                    <span style={styles.statLabel}>Projects</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>{profile.experience}</span>
                                    <span style={styles.statLabel}>Experience</span>
                                </div>
                            </div>

                            {profile.portfolio && profile.portfolio.length > 0 && (
                                <div style={styles.portfolioSection}>
                                    <h4 style={{...styles.sectionTitle, fontSize: '1rem'}}>Recent Projects</h4>
                                    {profile.portfolio.map((project, idx) => (
                                        <div key={idx} style={styles.portfolioItem}>
                                            <h5 style={{color: '#fff', marginBottom: '0.5rem'}}>{project.title}</h5>
                                            <p style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem'}}>{project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button style={styles.button}>
                                Contact Freelancer
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <h2 style={{...styles.sectionTitle, marginTop: '3rem'}}>📝 Post a New Opportunity</h2>
            <div style={styles.formSection}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Hive Username</label>
                    <input
                        type="text"
                        placeholder="Enter your Hive username"
                        value={hiveUser}
                        onChange={(e) => setHiveUser(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Job Title</label>
                    <input
                        type="text"
                        placeholder="Enter a descriptive job title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Job Description</label>
                    <textarea
                        placeholder="Provide detailed job requirements and responsibilities"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        style={styles.textarea}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Required Skills (comma-separated)</label>
                    <input
                        type="text"
                        placeholder="e.g., React, JavaScript, Smart Contracts"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Project Duration</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select duration</option>
                        <option value="Less than 1 month">Less than 1 month</option>
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="Ongoing">Ongoing</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Required Experience</label>
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select experience level</option>
                        <option value="Entry level">Entry level</option>
                        <option value="1+ years">1+ years</option>
                        <option value="2+ years">2+ years</option>
                        <option value="3+ years">3+ years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="7+ years">7+ years</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Budget (HBD)</label>
                    <input
                        type="number"
                        placeholder="Enter budget amount in HBD"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        style={styles.input}
                    />
                </div>

                <button onClick={postJob} style={styles.button}>
                    Post Job
                </button>
            </div>
        </div>
    );
};

export default HiveFreelance; 