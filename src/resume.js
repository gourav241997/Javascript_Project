const getData = async () => {
    try {
        const response = await fetch('../resumeData.json');
        const data = await response.json();
        return data.resume;
    }
    catch (error) {
        console.log(error);
    }
}
const data = await getData();

const getResume = (data,number) => {

    let userData = data.at(number);

    let name = userData.basics.name;
    let appliedPosition = userData.basics.AppliedFor;
    let phone = userData.basics.phone;
    let email = userData.basics.email;
    let url = userData.basics.profiles.url;

    document.getElementById('name').innerText = name;
    document.getElementById('positionApplied').innerText = `Applied for ${appliedPosition}`;
    document.getElementById('phone').innerText = phone;
    document.getElementById('email').innerText = email;
    document.getElementById('linkedIn').setAttribute('href', url);

    let skills = userData.skills.keywords;
    document.getElementById('skills').innerHTML = `
    ${skills.map(skill => {
        return (
            `<li> ${skill} </li>`
        )
    }).join('')}`;

    let hobbies = userData.interests.hobbies;
    document.getElementById('hobbies').innerHTML = `
    ${hobbies.map(hobby => {
        return (
            `<li> ${hobby} </li>`
        )
    }).join('')}`;

    let work = userData.work;
    document.getElementById('work').innerHTML = `
        <span><b>Company Name: </b> ${work["Company Name"]}</span><br />
        <span><b>Position: </b> ${work.Position}</span><br />
        <span><b>Start Date: </b> ${work["Start Date"]}</span><br />
        <span><b>End Date: </b> ${work["End Date"]}</span><br />
        <p><b>Summary: </b> ${work.Summary}</p>
    `;

    let projects = userData.projects;
    document.getElementById('projects').innerHTML = `
        <p><b>${projects.name}:</b> ${projects.description}
    `;

    let education = userData.education;
    let UG = education.UG;
    let PU = education['Senior Secondary'];
    let HS = education['High School']
    document.getElementById('education').innerHTML = `
        <li><b>UG: </b>${UG.institute}, ${UG.course}, ${UG['Start Date']}, ${UG['End Date']}, ${UG.cgpa}</li>
        <li><b>PU: </b>${PU.institute}, ${PU.cgpa}</li>
        <li><b>High School: </b>${HS.institute}, ${HS.cgpa}</li>
    `;

    let internship = userData.Internship;
    document.getElementById('internship').innerHTML = `
        <li><b>Company Name: </b>${internship['Company Name']}</li>
        <li><b>Position: </b>${internship.Position}</li>
        <li><b>Start Date: </b>${internship['Start Date']}</li>
        <li><b>End Date: </b>${internship['End Date']}</li>
        <li><b>Summary: </b>${internship.Summary}</li>
    `;

    let achievement = userData.achievements.Summary;
    document.getElementById('achievement').innerHTML = `
    ${achievement.map(achievement => `<li>${achievement}</li>`).join('')}
    `;

}


let page = 0;
let dataID = data.at(0).id;
let resumeData = data;

function next(data){
    move(true, data);
}
function prev(data){
    move(false, data);
}

function move(advance = true, data){
    page = (page + (advance? 1: -1) + data.length)% data.length;
    dataID = data.at(page).id;
    getResume(data, page);

    //Button Display Conditions 
    if(page == data.length-1){
        document.getElementById('next').style.display = 'none';
    }
    if(page < data.length-1){
        document.getElementById('next').style.display = 'inline';
    }
    if(page > 0){
        document.getElementById('prev').style.display = 'inline';
    }
    if(page == 0){
        document.getElementById('prev').style.display = 'none';
    }
}

document.getElementById('next').addEventListener('click', () => {
    next(resumeData);
})
document.getElementById('prev').addEventListener('click', () => {
    prev(resumeData);
})



function getSearchedProfiles(value){
    return data.filter(profile => {
        return profile.basics.AppliedFor.toLowerCase().trim() == value.toLowerCase().trim();
    })
}

document.getElementById('search').addEventListener('keyup', (event) => {
        let value = event.target.value;
        resumeData = getSearchedProfiles(value);
        if(resumeData.length == 0){
            document.getElementById('notFound').style.display = 'block';
            document.getElementById('resume').style.display = 'none';
            document.getElementById('next').style.display = 'none';
        }
        else if(resumeData.length == 1){
            document.getElementById('notFound').style.display = 'none';
            document.getElementById('resume').style.display = 'block';
            document.getElementById('next').style.display = 'none';
        }
        else{
            document.getElementById('notFound').style.display = 'none';
            document.getElementById('resume').style.display = 'block';
            document.getElementById('next').style.display = 'inline';
        }
        getResume(resumeData, 0);
})


//Intial Load
getResume(data, page);