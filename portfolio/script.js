const main = document.getElementById("main")

const INTRODUCTION = "introduction"
const PROJECTS = "projects"
const EXPERIENCE = "experience"
const EDUCATION = "education"
const ACTIVITIES = "activities"

let lastKnownPage = INTRODUCTION

const introductionSection = document.getElementById(INTRODUCTION)
const introductionButton = document.getElementById(INTRODUCTION + "Button")
const projectsSection = document.getElementById(PROJECTS)
const projectsButton = document.getElementById(PROJECTS + "Button")
const experienceSection = document.getElementById(EXPERIENCE)
const experienceButton = document.getElementById(EXPERIENCE + "Button")
const educationSection = document.getElementById(EDUCATION)
const educationButton = document.getElementById(EDUCATION + "Button")
const activitiesSection = document.getElementById(ACTIVITIES)
const activitiesButton = document.getElementById(ACTIVITIES + "Button")

main.addEventListener('scroll', function(e) {

    const projectsBoundingBox = projectsSection.getBoundingClientRect()
    const projectsSectionTop = projectsBoundingBox.y
    const projectsSectionBottom = projectsBoundingBox.y + projectsBoundingBox.height

    const experienceBoundingBox = experienceSection.getBoundingClientRect()
    const experienceSectionTop = experienceBoundingBox.y
    const experienceSectionBottom = experienceBoundingBox.y + experienceBoundingBox.height

    const educationBoundingBox = educationSection.getBoundingClientRect()
    const educationSectionTop = educationBoundingBox.y
    const educationSectionBottom = educationBoundingBox.y + educationBoundingBox.height


    const activitiesBoundingBox = activitiesSection.getBoundingClientRect()
    const activitiesSectionTop = activitiesBoundingBox.y
    const activitiesSectionBottom = activitiesBoundingBox.y + activitiesBoundingBox.height

    let currentPage

    if (projectsSectionTop <= 0 && projectsSectionBottom > 0) {
        currentPage = PROJECTS
    }

    else if (experienceSectionTop <= 0 && experienceSectionBottom > 0) {
        currentPage = EXPERIENCE
    }

    else if (educationSectionTop <= 0 && educationSectionBottom > 0) {
        currentPage = EDUCATION
    }

    else if (activitiesSectionTop <= 0 && activitiesSectionBottom > 0) {
        currentPage = ACTIVITIES
    }
 
    else {
        currentPage = INTRODUCTION
    }

    if (currentPage != lastKnownPage) {
        changePage(currentPage)
    }
    
});

function changePage(pageName) {
    lastKnownPage = pageName
    const currentPageButton = document.getElementById(pageName + "Button")

    resetAllButtons()
    setActiveButton(currentPageButton)
}

function resetAllButtons() {
    introductionButton.classList.remove("bg-gray-100", "text-gray-900")
    introductionButton.classList.add("text-gray-600")
    projectsButton.classList.remove("bg-gray-100", "text-gray-900")
    projectsButton.classList.add("text-gray-600")
    experienceButton.classList.remove("bg-gray-100", "text-gray-900")
    experienceButton.classList.add("text-gray-600")
    educationButton.classList.remove("bg-gray-100", "text-gray-900")
    educationButton.classList.add("text-gray-600")
    activitiesButton.classList.remove("bg-gray-100", "text-gray-900")
    activitiesButton.classList.add("text-gray-600")
}

function setActiveButton(button) {
    button.classList.remove("text-gray-600")
    button.classList.add("bg-gray-100", "text-gray-900")
}
