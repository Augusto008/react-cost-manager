function ProjectForm() {
  return (
    <form>
      <div>
        <input type="text" placeholder="Enter the project name" />
      </div>
      <div>
        <input type="number" placeholder="Enter the total project budget" />
      </div>
      <select name="category_id">
        <option disabled selected>
          Select the category
        </option>
      </select>
    </form>
  )
}

export default ProjectForm;