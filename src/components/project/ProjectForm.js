function ProjectForm() {
  return (
    <form>
      <div>
        <input type="text" placeholder="Enter the project name" />
      </div>
      <div>
        <input type="number" placeholder="Enter the total project budget" />
      </div>
      <div>
        <select name="category_id">
          <option disabled selected>
            Select the category
          </option>
        </select>
      </div>
      <div>
        <input type="submit" value="Create Project" />
      </div>
    </form>
  )
}

export default ProjectForm;