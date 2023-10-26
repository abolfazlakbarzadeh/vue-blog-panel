<template>
  <div class="articles-page">
    <div class="d-flex flex-column align-items-center gap-4">
      <h1 class="w-100">All Posts</h1>

      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Tags</th>
            <th scope="col">Excerpt</th>
            <th scope="col">Created</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td scope="row">Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>
              <div class="dropdown">
                <button
                  id="dropdownMenuButton1"
                  class="btn btn-info dropdown-toggle text-white"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actions
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li><a class="dropdown-item" href="#">Delete</a></li>
                </ul>
              </div>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#">{{ "<" }}</a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">{{ ">" }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup></script>
