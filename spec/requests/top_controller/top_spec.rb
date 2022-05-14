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

    context "dokotomeyo_guest_login_path" do
      it "guest_login response is 200" do
        get dokotomeyo_guest_login_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_delete_path" do
      it "delete response is 200" do
        get dokotomeyo_delete_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_issue_path" do
      it "issue response is 200" do
        get dokotomeyo_issue_path
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

    context "dokotomeyo_admin_path" do
      it "admin response is 200" do
        get dokotomeyo_admin_path
        expect(response).to have_http_status(200)
      end
    end

    context "dokotomeyo_post_inquiry_path" do
      it "post_inquiry response is 200" do
        get dokotomeyo_post_inquiry_path
        expect(response).to have_http_status(200)
      end
    end
  end
end
