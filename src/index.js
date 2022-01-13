import React from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";

// Component's Base CSS
import "./index.css";

const CompanyRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    Designation: "Create an example",
    Company: "Create an example of how to use the component",
    // Workstatus: "complete",
    Workstatus: "Create an example",
    WorkTitle: "Create",
    City: "enter a city",
  },
  {
    id: 2,
    Designation: "Improve",
    Company: "Improve the component!",
    // Workstatus: "complete",
    Workstatus: "Create an example",
    WorkTitle: "Create",
    City: "enter a city",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: payload => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: task => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: data => {
    const task = tasks.find(t => t.id === data.id);
    task.Designation = data.Designation;
    task.Company = data.Company;
    // task.Workstatus = data.Workstatus;
      task.Workstatus = data.Workstatus;
      task.WorkTitle = data.WorkTitle;
      task.City = data.City;

    return Promise.resolve(task);
  },
  delete: data => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="CRUD "
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field
          name="Designation"
          label="Designation"
          placeholder="Designation"
        />
        <Field name="Company" label="Company" render={CompanyRenderer} />
        <Field name="Workstatus" label="Workstatus" placeholder="Workstatus" />
        <Field name="WorkTitle" label="WorkTitle" placeholder="WorkTitle" />
        <Field name="City" label="City" placeholder="City" />
      </Fields>

      <CreateForm
        title="Task Creation"
        message="Create a new task!"
        trigger="Create Task"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.Designation) {
            errors.Designation = "Please, provide task's title";
          }

          if (!values.Company) {
            errors.description = "Please, provide task's description";
          }
          //   if (!values.Workstatus) {
          //     errors.Workstatus = "Please, provide task's title";
          //   }
          if (!values.Workstatus) {
            errors.Workstatus = "Please, provide task's title";
          }
          if (!values.WorkTitle) {
            errors.Title = "Please, provide task's title";
            }
             if (!values.City) {
               errors.City = "Please, provide task's title";
             }

          return errors;
        }}
      />
      <UpdateForm
        title="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.Designation) {
            errors.Designation = "Please, provide task's title";
          }

          if (!values.Company) {
            errors.Company = "Please, provide task's description";
          }
          //   if (!values.Workstatus) {
          //     errors.Workstatus = "Please, provide task's title";
          //   }
          if (!values.Workstatus) {
            errors.Workstatus = "Please, provide task's title";
          }
          if (!values.WorkTitle) {
            errors.Workstatus = "Please, provide task's title";
            }
             if (!values.City) {
               errors.Workstatus = "Please, provide task's title";
             }

          return errors;
        }}
      />
      <DeleteForm
        title="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

Example.propTypes = {};

ReactDOM.render(<Example />, document.getElementById("root"));
