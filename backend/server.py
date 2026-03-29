from fastapi import FastAPI, APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, date

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Supabase config
SUPABASE_URL = os.environ.get('SUPABASE_URL', 'https://lieymuvftztftprrkzsv.supabase.co')
SUPABASE_SERVICE_KEY = os.environ.get('SUPABASE_SERVICE_KEY', '')
SUPABASE_ANON_KEY = os.environ.get('SUPABASE_ANON_KEY', '')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer(auto_error=False)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ─── Supabase Helper ──────────────────────────────────────────
def supabase_headers(service_role=False):
    key = SUPABASE_SERVICE_KEY if service_role else SUPABASE_ANON_KEY
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }


async def verify_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify the user is authenticated and is an admin."""
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = credentials.credentials
    async with httpx.AsyncClient() as client:
        # Verify the JWT with Supabase
        resp = await client.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {token}"
            }
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = resp.json()
        user_id = user.get("id")
        
        # Check admin role
        resp2 = await client.get(
            f"{SUPABASE_URL}/rest/v1/user_roles?user_id=eq.{user_id}&role=eq.admin&select=id",
            headers=supabase_headers(service_role=True)
        )
        if resp2.status_code != 200 or not resp2.json():
            raise HTTPException(status_code=403, detail="Admin access required")
        
        return user


async def verify_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify the user is authenticated."""
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = credentials.credentials
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {token}"
            }
        )
        if resp.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid token")
        return resp.json()


# ─── Models ──────────────────────────────────────────────────
class DriveCreate(BaseModel):
    title: str
    company: str
    company_initials: Optional[str] = None
    company_about: Optional[str] = None
    company_address: Optional[str] = None
    city: str
    date: str
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    venue_name: Optional[str] = None
    venue_address: Optional[str] = None
    roles: Optional[List[str]] = None
    eligibility: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    experience_min: Optional[int] = None
    experience_max: Optional[int] = None
    documents_required: Optional[List[str]] = None
    openings: Optional[int] = None
    industry: Optional[str] = None
    department: Optional[str] = None
    employment_type: Optional[str] = None
    education: Optional[str] = None
    key_skills: Optional[List[str]] = None
    job_description: Optional[str] = None
    specifications: Optional[List[str]] = None
    apply_url: Optional[str] = None
    is_featured: Optional[bool] = False


class DriveUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    city: Optional[str] = None
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    venue_name: Optional[str] = None
    venue_address: Optional[str] = None
    roles: Optional[List[str]] = None
    eligibility: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    experience_min: Optional[int] = None
    experience_max: Optional[int] = None
    documents_required: Optional[List[str]] = None
    openings: Optional[int] = None
    industry: Optional[str] = None
    department: Optional[str] = None
    employment_type: Optional[str] = None
    education: Optional[str] = None
    key_skills: Optional[List[str]] = None
    job_description: Optional[str] = None
    specifications: Optional[List[str]] = None
    apply_url: Optional[str] = None
    is_featured: Optional[bool] = None
    status: Optional[str] = None
    approval_status: Optional[str] = None
    is_verified: Optional[bool] = None


class ApplicationCreate(BaseModel):
    drive_id: str
    full_name: str
    email: str
    phone: Optional[str] = None
    cover_note: Optional[str] = None


class EmailSubscribe(BaseModel):
    email: str


@api_router.get("/check-admin")
async def check_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Check if the current user is an admin."""
    if not credentials:
        return {"is_admin": False}
    
    token = credentials.credentials
    async with httpx.AsyncClient() as client:
        # Verify JWT
        resp = await client.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {token}"
            }
        )
        if resp.status_code != 200:
            return {"is_admin": False}
        
        user = resp.json()
        user_id = user.get("id")
        
        # Check role using service key (bypasses RLS)
        resp2 = await client.get(
            f"{SUPABASE_URL}/rest/v1/user_roles?user_id=eq.{user_id}&role=eq.admin&select=id",
            headers=supabase_headers(service_role=True)
        )
        is_admin = resp2.status_code == 200 and len(resp2.json()) > 0
        return {"is_admin": is_admin}


# ─── Public Routes ─────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "WALKINS API v1.0", "status": "healthy"}


@api_router.get("/drives")
async def get_drives(
    city: Optional[str] = None,
    industry: Optional[str] = None,
    experience_min: Optional[int] = None,
    experience_max: Optional[int] = None,
    search: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    """Get approved drives with optional filters."""
    async with httpx.AsyncClient() as client:
        # Build query
        params = "approval_status=eq.approved&order=date.asc"
        
        if city:
            params += f"&city=eq.{city}"
        if industry:
            params += f"&industry=eq.{industry}"
        if status:
            params += f"&status=eq.{status}"
        if experience_min is not None:
            params += f"&experience_min=gte.{experience_min}"
        if experience_max is not None:
            params += f"&experience_max=lte.{experience_max}"
        
        headers = supabase_headers(service_role=True)
        headers["Range"] = f"{offset}-{offset + limit - 1}"
        headers["Prefer"] = "count=exact"
        
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?{params}",
            headers=headers
        )
        
        drives = resp.json() if resp.status_code in [200, 206] else []
        
        # Client-side search filter (PostgREST doesn't support OR across multiple columns easily)
        if search:
            q = search.lower()
            drives = [d for d in drives if (
                q in d.get('title', '').lower() or
                q in d.get('company', '').lower() or
                q in d.get('city', '').lower() or
                q in d.get('industry', '').lower() or
                any(q in r.lower() for r in (d.get('roles') or [])) or
                any(q in s.lower() for s in (d.get('key_skills') or []))
            )]
        
        # Get total count from headers
        content_range = resp.headers.get('content-range', '')
        total = 0
        if '/' in content_range:
            try:
                total = int(content_range.split('/')[1])
            except (ValueError, IndexError):
                total = len(drives)
        else:
            total = len(drives)
        
        return {"drives": drives, "total": total}


@api_router.get("/drives/{drive_id}")
async def get_drive(drive_id: str):
    """Get a single drive by ID."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}&select=*",
            headers=supabase_headers(service_role=True)
        )
        drives = resp.json() if resp.status_code in [200, 206] else []
        if not drives:
            raise HTTPException(status_code=404, detail="Drive not found")
        return drives[0]


@api_router.get("/drives/{drive_id}/similar")
async def get_similar_drives(drive_id: str, limit: int = 3):
    """Get similar drives in the same city."""
    async with httpx.AsyncClient() as client:
        # First get the drive
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}&select=city",
            headers=supabase_headers(service_role=True)
        )
        drives = resp.json() if resp.status_code in [200, 206] else []
        if not drives:
            return []
        
        city = drives[0]['city']
        resp2 = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?city=eq.{city}&approval_status=eq.approved&id=neq.{drive_id}&limit={limit}&select=id,title,company,company_initials,city,date,roles,salary_min,salary_max",
            headers=supabase_headers(service_role=True)
        )
        return resp2.json() if resp2.status_code == 200 else []


@api_router.get("/cities")
async def get_cities():
    """Get list of cities with drive counts."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?approval_status=eq.approved&select=city",
            headers=supabase_headers(service_role=True)
        )
        drives = resp.json() if resp.status_code in [200, 206] else []
        city_counts = {}
        for d in drives:
            c = d['city']
            city_counts[c] = city_counts.get(c, 0) + 1
        
        return [{"city": c, "count": n} for c, n in sorted(city_counts.items(), key=lambda x: -x[1])]


# ─── Application Routes ──────────────────────────────────────
@api_router.post("/applications")
async def submit_application(app_data: ApplicationCreate, background_tasks: BackgroundTasks):
    """Submit an application for a drive."""
    async with httpx.AsyncClient() as client:
        # Check drive exists
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{app_data.drive_id}&select=id,title,company,city,date",
            headers=supabase_headers(service_role=True)
        )
        drives = resp.json() if resp.status_code in [200, 206] else []
        if not drives:
            raise HTTPException(status_code=404, detail="Drive not found")
        
        drive = drives[0]
        
        # Insert application
        resp2 = await client.post(
            f"{SUPABASE_URL}/rest/v1/applications",
            headers={**supabase_headers(service_role=True), "Prefer": "return=representation"},
            json={
                "drive_id": app_data.drive_id,
                "full_name": app_data.full_name,
                "email": app_data.email,
                "phone": app_data.phone,
                "cover_note": app_data.cover_note,
                "status": "submitted"
            }
        )
        
        if resp2.status_code not in [200, 201]:
            raise HTTPException(status_code=500, detail="Failed to submit application")
        
        # Increment registration count
        await client.patch(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{app_data.drive_id}",
            headers={**supabase_headers(service_role=True), "Prefer": "return=minimal"},
            json={"registration_count": (drive.get('registration_count') or 0) + 1}
        )
        
        # Send confirmation email via Resend in background
        background_tasks.add_task(
            send_application_email,
            app_data.email,
            app_data.full_name,
            drive
        )
        
        return {"message": "Application submitted successfully!", "application": resp2.json()[0] if resp2.json() else {}}


# ─── Email Routes ──────────────────────────────────────────
@api_router.post("/subscribe")
async def subscribe_email(data: EmailSubscribe):
    """Subscribe to email notifications."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{SUPABASE_URL}/rest/v1/email_subscribers",
            headers={**supabase_headers(service_role=True), "Prefer": "return=minimal"},
            json={"email": data.email}
        )
        if resp.status_code in [200, 201]:
            return {"message": "Subscribed successfully!"}
        elif resp.status_code == 409:
            return {"message": "Already subscribed!"}
        else:
            raise HTTPException(status_code=500, detail="Failed to subscribe")


# ─── Admin Routes ──────────────────────────────────────────
@api_router.get("/admin/drives")
async def admin_get_drives(user=Depends(verify_admin)):
    """Get all drives for admin."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?select=*&order=created_at.desc",
            headers=supabase_headers(service_role=True)
        )
        return resp.json() if resp.status_code in [200, 206] else []


@api_router.post("/admin/drives")
async def admin_create_drive(drive: DriveCreate, user=Depends(verify_admin)):
    """Create a new drive (auto-approved by admin)."""
    drive_data = drive.dict(exclude_none=True)
    drive_data["approval_status"] = "approved"
    drive_data["is_verified"] = True
    drive_data["posted_by"] = user.get("id")
    if not drive_data.get("company_initials"):
        drive_data["company_initials"] = drive_data["company"][:3].upper()
    
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{SUPABASE_URL}/rest/v1/drives",
            headers={**supabase_headers(service_role=True), "Prefer": "return=representation"},
            json=drive_data
        )
        if resp.status_code in [200, 201]:
            return resp.json()[0]
        else:
            raise HTTPException(status_code=500, detail=f"Failed to create drive: {resp.text}")


@api_router.patch("/admin/drives/{drive_id}")
async def admin_update_drive(drive_id: str, drive: DriveUpdate, user=Depends(verify_admin)):
    """Update a drive."""
    update_data = drive.dict(exclude_none=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    async with httpx.AsyncClient() as client:
        resp = await client.patch(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}",
            headers={**supabase_headers(service_role=True), "Prefer": "return=representation"},
            json=update_data
        )
        if resp.status_code in [200, 206]:
            result = resp.json()
            if result:
                return result[0]
            raise HTTPException(status_code=404, detail="Drive not found")
        raise HTTPException(status_code=500, detail="Failed to update drive")


@api_router.delete("/admin/drives/{drive_id}")
async def admin_delete_drive(drive_id: str, user=Depends(verify_admin)):
    """Delete a drive."""
    async with httpx.AsyncClient() as client:
        resp = await client.delete(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}",
            headers=supabase_headers(service_role=True)
        )
        if resp.status_code in [200, 204]:
            return {"message": "Drive deleted successfully"}
        raise HTTPException(status_code=500, detail="Failed to delete drive")


@api_router.get("/admin/applications")
async def admin_get_applications(drive_id: Optional[str] = None, user=Depends(verify_admin)):
    """Get all applications."""
    async with httpx.AsyncClient() as client:
        url = f"{SUPABASE_URL}/rest/v1/applications?select=*&order=created_at.desc"
        if drive_id:
            url += f"&drive_id=eq.{drive_id}"
        
        resp = await client.get(url, headers=supabase_headers(service_role=True))
        return resp.json() if resp.status_code in [200, 206] else []


@api_router.get("/admin/subscribers")
async def admin_get_subscribers(user=Depends(verify_admin)):
    """Get all email subscribers."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/email_subscribers?select=*&order=subscribed_at.desc",
            headers=supabase_headers(service_role=True)
        )
        return resp.json() if resp.status_code in [200, 206] else []


@api_router.get("/admin/stats")
async def admin_get_stats(user=Depends(verify_admin)):
    """Get admin dashboard stats."""
    async with httpx.AsyncClient() as client:
        headers = supabase_headers(service_role=True)
        
        # Get drives
        resp_drives = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?select=id,approval_status",
            headers=headers
        )
        drives = resp_drives.json() if resp_drives.status_code == 200 else []
        
        # Get subscribers
        resp_subs = await client.get(
            f"{SUPABASE_URL}/rest/v1/email_subscribers?select=id",
            headers=headers
        )
        subs = resp_subs.json() if resp_subs.status_code == 200 else []
        
        # Get applications
        resp_apps = await client.get(
            f"{SUPABASE_URL}/rest/v1/applications?select=id",
            headers=headers
        )
        apps = resp_apps.json() if resp_apps.status_code == 200 else []
        
        pending = len([d for d in drives if d.get('approval_status') == 'pending'])
        approved = len([d for d in drives if d.get('approval_status') == 'approved'])
        
        return {
            "total_drives": len(drives),
            "pending_drives": pending,
            "approved_drives": approved,
            "total_subscribers": len(subs),
            "total_applications": len(apps)
        }


@api_router.post("/admin/drives/{drive_id}/approve")
async def admin_approve_drive(drive_id: str, user=Depends(verify_admin)):
    """Approve a drive."""
    async with httpx.AsyncClient() as client:
        resp = await client.patch(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}",
            headers={**supabase_headers(service_role=True), "Prefer": "return=minimal"},
            json={"approval_status": "approved", "is_verified": True}
        )
        if resp.status_code in [200, 206]:
            return {"message": "Drive approved"}
        raise HTTPException(status_code=500, detail="Failed to approve")


@api_router.post("/admin/drives/{drive_id}/reject")
async def admin_reject_drive(drive_id: str, user=Depends(verify_admin)):
    """Reject a drive."""
    async with httpx.AsyncClient() as client:
        resp = await client.patch(
            f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive_id}",
            headers={**supabase_headers(service_role=True), "Prefer": "return=minimal"},
            json={"approval_status": "rejected"}
        )
        if resp.status_code in [200, 206]:
            return {"message": "Drive rejected"}
        raise HTTPException(status_code=500, detail="Failed to reject")


# ─── Auto-Expiry ──────────────────────────────────────────
@api_router.post("/admin/cleanup-expired")
async def cleanup_expired_drives(user=Depends(verify_admin)):
    """Mark expired drives as completed."""
    today = date.today().isoformat()
    async with httpx.AsyncClient() as client:
        # Get expired drives that are still active
        resp = await client.get(
            f"{SUPABASE_URL}/rest/v1/drives?date=lt.{today}&status=neq.completed&approval_status=eq.approved&select=id,title,company,date",
            headers=supabase_headers(service_role=True)
        )
        expired = resp.json() if resp.status_code in [200, 206] else []
        
        count = 0
        for drive in expired:
            resp2 = await client.patch(
                f"{SUPABASE_URL}/rest/v1/drives?id=eq.{drive['id']}",
                headers={**supabase_headers(service_role=True), "Prefer": "return=minimal"},
                json={"status": "completed"}
            )
            if resp2.status_code == 200:
                count += 1
        
        return {"message": f"Marked {count} expired drives as completed", "expired_count": count}


# ─── Resend Email Helper ──────────────────────────────────
async def send_application_email(to_email: str, name: str, drive: dict):
    """Send application confirmation email via Resend."""
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set, skipping email")
        return
    
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "from": "WALKINS <onboarding@resend.dev>",
                    "to": [to_email],
                    "subject": f"Application Confirmed - {drive.get('company', '')} Walk-in Drive",
                    "html": f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: linear-gradient(135deg, #4F46E5, #7C3AED); padding: 30px; border-radius: 12px 12px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">WALKINS</h1>
                            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">Walk In. Interview. Get Hired.</p>
                        </div>
                        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px;">
                            <h2 style="color: #1a1a1a;">Hi {name},</h2>
                            <p style="color: #666;">Your application has been submitted successfully!</p>
                            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
                                <h3 style="margin: 0 0 10px; color: #1a1a1a;">{drive.get('title', 'Walk-in Drive')}</h3>
                                <p style="margin: 5px 0; color: #666;"><strong>Company:</strong> {drive.get('company', '')}</p>
                                <p style="margin: 5px 0; color: #666;"><strong>City:</strong> {drive.get('city', '')}</p>
                                <p style="margin: 5px 0; color: #666;"><strong>Date:</strong> {drive.get('date', '')}</p>
                            </div>
                            <p style="color: #666;">Please carry all required documents. Good luck!</p>
                            <p style="color: #999; font-size: 12px; margin-top: 30px;">This email was sent by WALKINS - India's First Walk-in Drive Platform</p>
                        </div>
                    </div>
                    """
                }
            )
            if resp.status_code in [200, 201]:
                logger.info(f"Email sent to {to_email}")
            else:
                logger.error(f"Email failed: {resp.status_code} - {resp.text}")
    except Exception as e:
        logger.error(f"Email error: {e}")


# ─── Include Router & Middleware ──────────────────────────
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
