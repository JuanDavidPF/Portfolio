const homeBtn = document.getElementById("#homeBtn")
const meBtn = document.getElementById("#meBtn")
const projectsBtn = document.getElementById("#projectsBtn")

homeBtn.addEventListener("click",()=>{
   Redirect("/home")
})
meBtn.addEventListener("click",()=>{
    Redirect("/about-me")

})
projectsBtn.addEventListener("click",()=>{
    Redirect("/projects")
})