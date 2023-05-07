const state = {
    tasklist: [],
};

const taskContent = document.querySelector(".task_contents");
const taskmodal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({ id, title, url, description, type }) =>
    `
<div class='col-md-6 col-lg-4' id=${id} key=${id}>
<div class='card shadow-sm task__card'>

<div class='class-header d-flex gap-2 justify-content-end task__card__header'›
<button type='button' class='btn btn-outline-primary mr-2' name=${id}>
<i class='fas fa-pencil-alt' name=${id}>
</i>
</button>
<button type='button' class='btn btn-outline-danger mr-2' name=${id}>
<i class='fas fa-trash-alt' name=${id}>
</i>
</button>
</div>


<div class='card-body'>
${url
        ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
        : `
<img width='100%' height='150px' style="object-fit: cover; object-position: center" src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
`
    }
<h4 class='task__card__title'>${title}</h4>
<p class='description trim-3-lines test-muted' data-gram_editor='false'>${description}</p>

<div class='tags text-white d-flex flex-wrap'>
<span class='badge bg-primary m-1'>${type}</span>
</div>
</div>

<div class='card-footer '>
<button type='button' class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#showTask' onclick='openTask.apply(this, arguments)' id=${id}>
open task
</button>
</div>
</div>
</div>
`;

const htmlmodalcontent = ({ id, title, url, description }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${url
            ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
            : `
    <img width='100%' height='150px' style="object-fit: cover; object-position: center" src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
    `
        }
<strong class='text-sm test-muted'>Created on ${date.toDateString()}</strong>
<h2 class='my-3'>${title}</h2>
<p class='lead'>${description}</p>
    </div>
    `;
};

const updateLocalStorage = () => {
    localStorage.setItem("task", JSON.stringify(
        {
            task: state.tasklist,
        }
    ));
};

const loadInitialData = () => {
    const localstoragecopy = JSON.parse(localStorage.task);

    if (localstoragecopy) state.tasklist = localstoragecopy.task;

    state.tasklist.map((carddata) => {
        taskContent.insertAdjacentHTML("beforeend", htmlTaskContent(carddata));
    }
    );
};

const handlesubmit = (event) => {
    const id = `${Date.now()}`;
    const input =
    {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        type: document.getElementById('tags').value,
        description: document.getElementById('taskDescription').value,
    };

    if (input.title === "" || input.description === "" || input.type === "") {
        return alert("Please fill all the fields");
    }



    taskContent.insertAdjacentHTML
        (
            "beforeend",
            htmlTaskContent({
                ...input, id,
            })

        );

    state.tasklist.push({ ...input, id });
    updateLocalStorage();
};

const openTask = (e) => {
    if (!e) e = window.event;

    const getTask = state.tasklist.find(({ id }) => id === e.target.id);
    taskmodal.innerHTML = htmlmodalcontent(getTask);
}
