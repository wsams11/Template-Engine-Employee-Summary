const path = require("path")
const fs = require("fs")
const templatesDirectory = path.resolve(__dirname,"../templates")

const render = employees => {
    const HTML = [];
HTML.push(employees.filter(employee => employee.getRole()==="Manager").map(manager=>renderManager(manager)))
HTML.push(employees.filter(employee => employee.getRole()==="Engineer").map(engineer=>renderEngineer(engineer)))
HTML.push(employees.filter(employee => employee.getRole()==="Intern").map(intern=>renderIntern(intern)))
return renderMain(HTML.join(""))
}

const renderManager = manager=>{
    let template = fs.readFileSync(path.resolve(templatesDirectory, "manager.html"),"utf8")
    template = replacePlaceholders(template,"name",manager.getName())
    template = replacePlaceholders(template,"ID",manager.getID())
    template = replacePlaceholders(template,"email",manager.getEmail())
    template = replacePlaceholders(template,"officeNumber",manager.getOfficeNumber())
    return template
}
const renderIntern = intern=>{
    let template = fs.readFileSync(path.resolve(templatesDirectory, "intern.html"),"utf8")
    template = replacePlaceholders(template,"name",intern.getName())
    template = replacePlaceholders(template,"ID",intern.getID())
    template = replacePlaceholders(template,"email",intern.getEmail())
    template = replacePlaceholders(template,"school",intern.getSchool())
    return template
}
const renderEngineer = engineer=>{
    let template = fs.readFileSync(path.resolve(templatesDirectory, "engineer.html"),"utf8")
    template = replacePlaceholders(template,"name",engineer.getName())
    template = replacePlaceholders(template,"ID",engineer.getID())
    template = replacePlaceholders(template,"email",engineer.getEmail())
    template = replacePlaceholders(template,"github",engineer.getGithub())
    return template
}

const renderMain = html => {
    let template = fs.readFileSync(path.resolve(templatesDirectory, "main.html"),"utf8")
    return replacePlaceholders(template,"team",html)
}
const replacePlaceholders = (template,placeholder,value)=>{
    const pattern = new RegExp("{{ " + placeholder + " }}","gm")
    return template.replace(pattern,value)
}
module.export = render;