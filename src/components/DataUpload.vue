<template>
  <CCard>
    <CCardHeader>
      Upload files
    </CCardHeader>
    <CCardBody>
      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>Drop files to upload</h3>
      </div>
      <CDataTable
        :items="files"
        :fields="fields"
        column-filter
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <template #show_edit="{item}">
          <td>
            <router-link
              tag="a"
              :to="{
                name: 'BusinessProcessEdit',
                params: { id: item.id }
              }"
            >
              <edit-icon />
            </router-link>
          </td>
        </template>
        <template #show_upload="{item}">
          <td>
            <span class="icon-link" @click="modalOpen(item)"
              ><delete-icon
            /></span>
          </td>
        </template>
        <template #show_delete="{item}">
          <td>
            <span class="icon-link" @click="modalOpen(item)"
              ><delete-icon
            /></span>
          </td>
        </template>
        <template #no-items-view>
          <div class="text-center p-3">
            <h4>Drag files anywhere to upload<br />or</h4>
            <label for="file" class="btn btn-square btn-sm btn-primary"
              >Select Files</label
            >
          </div>
        </template>
      </CDataTable>
    </CCardBody>
    <CCardFooter>
      <file-upload
        class="btn btn-square btn-sm btn-primary mr-2"
        post-action="/upload/post"
        :multiple="true"
        :drop="true"
        :drop-directory="true"
        v-model="files"
        ref="upload"
      >
        <i class="fa fa-plus"></i>
        Select files
      </file-upload>
      <CButton
        shape="square"
        size="sm"
        color="success"
        v-if="!$refs.upload || !$refs.upload.active"
        @click.prevent="$refs.upload.active = true"
      >
        Start Upload
      </CButton>
      <button
        type="button"
        class="btn btn-danger"
        v-else
        @click.prevent="$refs.upload.active = false"
      >
        <i class="fa fa-stop" aria-hidden="true"></i>
        Stop Upload
      </button>
    </CCardFooter>
  </CCard>
</template>

<script>
import FileUpload from "vue-upload-component";
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files: [],
      fields: [
        { key: "name", _style: "width:15%" },
        { key: "size", _style: "width:15%;" },
        { key: "status", _style: "width:20%;" },
        {
          key: "show_edit",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_upload",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        },
        {
          key: "show_delete",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false
        }
      ]
    };
  }
};
</script>

<style>
.example-drag label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}

.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
}

.drop-active h3 {
  margin: -0.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
