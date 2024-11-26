const employees = [
  {
    id: 1,
    email: "e@e.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fix login bug",
        taskDescription: "Resolve the issue preventing users from logging in.",
        taskDate: "2024-11-20",
        category: "Bug Fix",
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Update dashboard UI",
        taskDescription: "Revamp the dashboard to improve user experience.",
        taskDate: "2024-11-22",
        category: "UI/UX",
      },
    ],
    firstName: "Rohit",
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 },
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Prepare monthly report",
        taskDescription: "Compile and analyze the monthly sales data.",
        taskDate: "2024-11-18",
        category: "Analytics",
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Deploy server updates",
        taskDescription: "Deploy critical updates to the production server.",
        taskDate: "2024-11-17",
        category: "DevOps",
      },
    ],
    firstName: "Rohitt",
    taskNumbers: { active: 1, newTask: 0, completed: 1, failed: 1 },
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Write API documentation",
        taskDescription: "Document the newly developed APIs for external use.",
        taskDate: "2024-11-21",
        category: "Documentation",
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create marketing strategy",
        taskDescription: "Develop a new strategy for Q1 campaigns.",
        taskDate: "2024-11-23",
        category: "Marketing",
      },
    ],
    firstName: "Priya",
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 },
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "123",
    tasks: [
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Test feature XYZ",
        taskDescription: "Perform QA on the newly released feature XYZ.",
        taskDate: "2024-11-16",
        category: "Testing",
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Organize team meeting",
        taskDescription: "Schedule and prepare for the upcoming team discussion.",
        taskDate: "2024-11-20",
        category: "Management",
      },
    ],
    firstName: "Vikram",
    taskNumbers: { active: 1, newTask: 1, completed: 1, failed: 0 },
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "123",
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Optimize database",
        taskDescription: "Optimize database queries for faster response times.",
        taskDate: "2024-11-25",
        category: "Database",
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Improve accessibility",
        taskDescription: "Enhance web accessibility for better usability.",
        taskDate: "2024-11-28",
        category: "Accessibility",
      },
    ],
    firstName: "Manoj",
    taskNumbers: { active: 1, newTask: 1, completed: 0, failed: 0 },
  },
];

  
  const admin = [
    {
      "id": 1,
      "email": "admin@example.com",
      "password": "123"
    }
  ];

export const setLocalStorage=()=>{
        localStorage.setItem('employees', JSON.stringify(employees))
        localStorage.setItem('admin', JSON.stringify(admin))
}
export const getLocalStorage=()=>{
    const employees = JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    return{employees, admin}
    // const localStorage.getItem('admin', JSON.stringify(admin))
}