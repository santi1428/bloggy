const state = {
    posts: [
    {name: 'Santiago', date: "Hace 20 dias", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur ut simlique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
`},
    {name: 'Andres', date: "Hace 2 dias", body: `Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.`},
    {name: 'Daniel', date: "Hace 3 meses", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem psum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernatur t similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.`},
    {name: "Tomas", date:"Hace 3 horas", body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam suscipit esse totam corrupti mollitia ducimus praesentium at. Quod, facilis. Veniam dignissimos consectetur aut provident beatae amet deserunt ab quasi!
    Ea labore sapiente rem debitis harum. Aspernaur ut similique aut, tempore eius voluptatibus. Est tempora, repellat exercitationem, aut vel ullam consequuntur rem voluptatibus voluptate eum placeat reiciendis impedit quidem sapiente.
    Eligendi harum, officia perferendis ex, quidem reiciendis adipisci similique iste porro expedita et eaque. Excepturi odit, aperiam illum commodi odio officia. Voluptatum libero odit dicta nisi similique a? Velit, culpa?
    Nulla, fuga! Delectus ad ipsam laboriosam tenetur assumenda voluptatum et fugit vitae. Quae, harum quo sit pariatur illo tempora repudiandae doloribus porro molestiae iure natus facilis unde optio vel saepe!
    Ratione, explicabo! Porro quae explicabo maiores nostrum sit libero officia consectetur aliquam dicta itaque, architecto error amet saepe ea possimus accusantium minima? Harum obcaecati temporibus assumenda provident nisi suscipit quaerat.`}
]
};

const getters = {
    getPosts(state){
        return state.posts;
    }
};

const mutations = {
    agregarPublicacion(state, publicacion){
        state.posts.push(publicacion);
    }   
};

const actions = {
    guardarPublicacion({ commit }, publicacion){
            return new Promise((resolve, reject) => {
                commit("agregarPublicacion", publicacion);
                resolve();
            });
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}

