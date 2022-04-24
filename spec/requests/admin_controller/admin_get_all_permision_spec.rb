RSpec.describe "admin", type: :request do
  describe "GET" do
    context "get_all_permission" do
      let!(:permission_1) do
        create(
          :edit_param,
          id: 1,
          created_at: "2022-01-01T12:00:00.000+09:00",
          updated_at: "2022-01-01T12:00:00.000+09:00",
        )
      end
      let!(:permission_2) do
        create(
          :edit_param,
          id: 2,
          created_at: "2022-01-01T12:00:00.000+09:00",
          updated_at: "2022-01-01T12:00:00.000+09:00",
        )
      end
      let!(:permission_3) do
        create(
          :edit_param,
          id: 3,
          created_at: "2022-01-01T12:00:00.000+09:00",
          updated_at: "2022-01-01T12:00:00.000+09:00",
        )
      end

      it "get_all_permission return all edit_param" do
        get dokotomeyo_admin_permission_path

        expect(JSON.parse(response.body)["status"]).to eq 200
        expect(JSON.parse(response.body)["edit_params"]).to include(permission_1.attributes, permission_2.attributes, permission_3.attributes)
      end
    end
  end
end
