const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'src/LandingPage/Founder.tsx',
    'src/LandingPage/AboutUs.tsx',
    'src/Program/Karate.tsx',
    'src/Program/Gymnastics.tsx',
    'src/Program/GymnasticsProgrammeContent.tsx',
    'src/Page/Event.tsx',
    'src/LandingPage/SportsDisciplines.tsx',
    'src/LandingPage/HeroSection.tsx'
];

filesToUpdate.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${fullPath}`);
        return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf-8');
    
    // Add loading="lazy" to <img> tags that don't have it (excluding HeroSection's HERO_BANNER_SRC which is eager)
    // Actually, HeroSection we can skip or specifically handle.
    if (!file.includes('HeroSection.tsx')) {
        content = content.replace(/<img\s+(?![^>]*loading=)/g, '<img loading="lazy" ');
    }
    
    // Add preload="none" to <video> tags that don't have it (excluding HeroSection which is autoPlay)
    if (!file.includes('HeroSection.tsx') && !file.includes('Founder.tsx')) {
        content = content.replace(/<video\s+(?![^>]*preload=)/g, '<video preload="none" ');
    } else if (file.includes('Founder.tsx')) {
        // Founder has one video which is probably autoPlay. Let's check it manually later or just add preload="none" to all if they don't have autoPlay.
        content = content.replace(/<video\s+(?![^>]*(?:preload=|autoPlay))/g, '<video preload="none" ');
    }

    // Add loading="lazy" to <iframe> tags
    content = content.replace(/<iframe\s+(?![^>]*loading=)/g, '<iframe loading="lazy" ');

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${file}`);
});
