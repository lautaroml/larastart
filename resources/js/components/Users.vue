<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" v-on:click="newModal">Add New <i class="fas fa-user-plus"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered at</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type | upText}}</td>
                                <td>{{user.created_at | prityDate}}</td>
                                <td>
                                    <a href="#" @click="editModal(user)">
                                        <i class="fa fa-edit"></i>
                                    </a>
                                    <a href="#" v-on:click="deleteUser(user.id)">
                                        <i class="fa fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" v-text="editMode ? 'Editar Usuario' : 'Agregar Nuevo Usuario'"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name"
                                       placeholder="Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="email" email="email"
                                       placeholder="Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                            <textarea v-model="form.bio" name="bio" cols="30" rows="4"
                                      placeholder="Short bio for user (optional)"
                                      class="form-control" :class="{'is-invalid': form.errors.has('bio')}">

                            </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select name="type" v-model="form.type" class="form-control"
                                        :class="{'is-invalid': form.errors.has('type')}">
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="autho">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password"
                                       placeholder="Password"
                                       class="form-control" :class="{'is-invalid': form.errors.has('password')}">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <!--<div class="form-group">
                                <input v-model="form.password-confirm" type="password" name="password-confirm"
                                       class="form-control" :class="{'is-invalid': form.errors.has('password-confirm')}">
                                <has-error :form="form" field="password-confirm"></has-error>
                            </div>-->

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" v-text="editMode ? 'Editar' : 'Crear'"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                editMode : false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: '',
                    remember: false
                })
            }
        },
        methods: {
            newModal() {
                this.editMode = false;
                this.form.reset();
                this.form.clear();
                $('#addNew').modal('show');
            },
            editModal(user) {
                this.editMode = true;
                this.form.reset();
                this.form.clear();
                this.form.fill(user);
                $('#addNew').modal('show');
            },
            loadUsers() {
                axios.get('api/users').then(({data}) => (this.users = data.data));
            },
            createUser() {
                this.$Progress.start();
                this.form.post('api/users')
                    .then(() => {
                        setTimeout(() => Fire.$emit('afterCreated'), 1000);
                        $('#addNew').modal('hide');
                        toast.fire({
                            icon: 'success',
                            title: 'User created successfully'
                        });
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'})
                        this.$Progress.fail();
                    });

            },
            updateUser() {
                this.$Progress.start();
                this.form.patch('api/users/' + this.form.id)
                    .then(() => {
                        setTimeout(() => Fire.$emit('afterCreated'), 1000);
                        $('#addNew').modal('hide');
                        toast.fire({
                            icon: 'success',
                            title: 'User updated successfully'
                        });
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'})
                        this.$Progress.fail();
                    });
            },
            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.form.delete('api/users/' + id)
                            .then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('afterCreated');
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!'})
                            });
                    }
                })
            }
        },
        created() {
            this.loadUsers();
            Fire.$on('afterCreated', () => {
                this.loadUsers();
            });
        }
    }
</script>
