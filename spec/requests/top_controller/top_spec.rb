RSpec.describe "top", type: :request do
  describe "GET" do
    context "root_path" do
      it "root response is 200" do
        get root_path
        expect(response).to redirect_to(dokotomeyo_path)
      end
    end

    context "dokotomeyo_path" do
      it "top response is 200" do
        get dokotomeyo_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_mypage_path" do
      it "mypage response is 200" do
        get dokotomeyo_mypage_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_post_path" do
      it "post response is 200" do
        get dokotomeyo_post_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_signup_path" do
      it "signup response is 200" do
        get dokotomeyo_signup_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_login_path" do
      it "login response is 200" do
        get dokotomeyo_login_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo/parking/:id path" do
      it "parking response is 200" do
        get "/dokotomeyo/parking/1"
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo/detail/:id path" do
      it "detail response is 200" do
        get "/dokotomeyo/detail/1"
        expect(response).to have_http_status(200)
      end
    end
  end
end
